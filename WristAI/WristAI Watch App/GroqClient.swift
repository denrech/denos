import Foundation

/// Клиент для любого OpenAI-совместимого API. По умолчанию — Groq (бесплатный tier).
struct GroqClient {
    static let defaultBaseURL = "https://api.groq.com/openai/v1"
    static let defaultModel = "llama-3.3-70b-versatile"
    static let transcriptionModel = "whisper-large-v3-turbo"

    let apiKey: String
    let model: String
    let baseURL: String

    struct Message: Codable {
        let role: String
        let content: String
    }

    enum ClientError: LocalizedError {
        case badURL
        case badResponse(Int, String)
        case emptyAnswer

        var errorDescription: String? {
            switch self {
            case .badURL:
                return "Некорректный адрес сервера. Проверьте Base URL в настройках."
            case .badResponse(let code, let body):
                return "Ошибка сервера (\(code)). \(body)"
            case .emptyAnswer:
                return "Модель вернула пустой ответ."
            }
        }
    }

    // MARK: - Chat

    func chat(messages: [Message]) async throws -> String {
        struct RequestBody: Codable {
            let model: String
            let messages: [Message]
            let temperature: Double
            let max_tokens: Int
        }
        struct ResponseBody: Codable {
            struct Choice: Codable { let message: Message }
            let choices: [Choice]
        }

        var request = URLRequest(url: try endpoint("chat/completions"))
        request.httpMethod = "POST"
        request.setValue("Bearer \(apiKey)", forHTTPHeaderField: "Authorization")
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.httpBody = try JSONEncoder().encode(
            RequestBody(model: model, messages: messages, temperature: 0.6, max_tokens: 600)
        )

        let data = try await perform(request)
        let decoded = try JSONDecoder().decode(ResponseBody.self, from: data)
        guard let text = decoded.choices.first?.message.content,
              !text.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty else {
            throw ClientError.emptyAnswer
        }
        return text.trimmingCharacters(in: .whitespacesAndNewlines)
    }

    // MARK: - Speech to text (Whisper)

    func transcribe(fileURL: URL) async throws -> String {
        struct ResponseBody: Codable { let text: String }

        let boundary = "Boundary-\(UUID().uuidString)"
        var request = URLRequest(url: try endpoint("audio/transcriptions"))
        request.httpMethod = "POST"
        request.setValue("Bearer \(apiKey)", forHTTPHeaderField: "Authorization")
        request.setValue("multipart/form-data; boundary=\(boundary)", forHTTPHeaderField: "Content-Type")

        var body = Data()
        func appendField(name: String, value: String) {
            body.append(Data("--\(boundary)\r\nContent-Disposition: form-data; name=\"\(name)\"\r\n\r\n\(value)\r\n".utf8))
        }
        appendField(name: "model", value: Self.transcriptionModel)
        appendField(name: "response_format", value: "json")

        let audioData = try Data(contentsOf: fileURL)
        body.append(Data("--\(boundary)\r\nContent-Disposition: form-data; name=\"file\"; filename=\"voice.m4a\"\r\nContent-Type: audio/mp4\r\n\r\n".utf8))
        body.append(audioData)
        body.append(Data("\r\n--\(boundary)--\r\n".utf8))
        request.httpBody = body

        let data = try await perform(request)
        let decoded = try JSONDecoder().decode(ResponseBody.self, from: data)
        return decoded.text.trimmingCharacters(in: .whitespacesAndNewlines)
    }

    // MARK: - Helpers

    private func endpoint(_ path: String) throws -> URL {
        let base = baseURL.hasSuffix("/") ? String(baseURL.dropLast()) : baseURL
        guard let url = URL(string: "\(base)/\(path)") else { throw ClientError.badURL }
        return url
    }

    private func perform(_ request: URLRequest) async throws -> Data {
        let (data, response) = try await URLSession.shared.data(for: request)
        let code = (response as? HTTPURLResponse)?.statusCode ?? 0
        guard (200..<300).contains(code) else {
            let body = String(data: data.prefix(200), encoding: .utf8) ?? ""
            throw ClientError.badResponse(code, body)
        }
        return data
    }
}
