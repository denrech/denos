import Foundation
import SwiftUI

@MainActor
final class ChatViewModel: ObservableObject {
    @Published var messages: [ChatMessage] = []
    @Published var isBusy = false
    @Published var statusText = ""
    @Published var errorText: String?

    private let speaker = Speaker()
    private var defaults: UserDefaults { .standard }

    private var apiKey: String {
        let stored = defaults.string(forKey: "groqApiKey") ?? ""
        return stored.isEmpty ? Secrets.groqAPIKey : stored
    }
    private var model: String {
        let stored = defaults.string(forKey: "model") ?? ""
        return stored.isEmpty ? GroqClient.defaultModel : stored
    }
    private var baseURL: String {
        let stored = defaults.string(forKey: "baseURL") ?? ""
        return stored.isEmpty ? GroqClient.defaultBaseURL : stored
    }
    private var speakReplies: Bool {
        defaults.object(forKey: "speakReplies") as? Bool ?? true
    }

    func send(text: String) {
        Task { await run(userText: text) }
    }

    /// Голосовое сообщение: файл -> Whisper -> текст -> чат.
    func sendVoice(fileURL: URL) {
        Task {
            guard ensureKey() else { return }
            isBusy = true
            statusText = "Распознаю…"
            errorText = nil
            do {
                let text = try await client().transcribe(fileURL: fileURL)
                isBusy = false
                await run(userText: text)
            } catch {
                fail(error)
            }
        }
    }

    func clearHistory() {
        speaker.stop()
        messages.removeAll()
        errorText = nil
    }

    private func run(userText: String) async {
        guard ensureKey() else { return }
        let trimmed = userText.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !trimmed.isEmpty else { return }

        messages.append(ChatMessage(role: .user, text: trimmed))
        isBusy = true
        statusText = "Думаю…"
        errorText = nil
        do {
            let reply = try await client().chat(messages: apiHistory())
            messages.append(ChatMessage(role: .assistant, text: reply))
            isBusy = false
            if speakReplies {
                speaker.speak(reply)
            }
        } catch {
            fail(error)
        }
    }

    private func apiHistory() -> [GroqClient.Message] {
        var items: [GroqClient.Message] = [
            .init(
                role: "system",
                content: "Ты голосовой ассистент на Apple Watch. Отвечай кратко и по делу, на языке собеседника, обычным текстом без markdown-разметки."
            )
        ]
        // Отправляем только хвост истории, чтобы не раздувать запрос.
        items += messages.suffix(12).map {
            .init(role: $0.role == .user ? "user" : "assistant", content: $0.text)
        }
        return items
    }

    private func client() -> GroqClient {
        GroqClient(apiKey: apiKey, model: model, baseURL: baseURL)
    }

    private func ensureKey() -> Bool {
        if apiKey.isEmpty {
            errorText = "Укажите API-ключ Groq в настройках (шестерёнка вверху)."
            return false
        }
        return true
    }

    private func fail(_ error: Error) {
        isBusy = false
        errorText = error.localizedDescription
    }
}
