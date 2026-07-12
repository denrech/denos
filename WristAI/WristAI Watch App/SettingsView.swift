import SwiftUI

struct SettingsView: View {
    @AppStorage("groqApiKey") private var apiKey = ""
    @AppStorage("model") private var model = GroqClient.defaultModel
    @AppStorage("speakReplies") private var speakReplies = true
    @AppStorage("baseURL") private var baseURL = GroqClient.defaultBaseURL

    var onClearHistory: () -> Void = {}

    var body: some View {
        Form {
            Section("Groq API") {
                TextField("API-ключ", text: $apiKey)
                    .textInputAutocapitalization(.never)
                Picker("Модель", selection: $model) {
                    Text("Llama 3.3 70B").tag("llama-3.3-70b-versatile")
                    Text("Llama 3.1 8B (быстрая)").tag("llama-3.1-8b-instant")
                    Text("GPT-OSS 120B").tag("openai/gpt-oss-120b")
                }
            }

            Section("Ответы") {
                Toggle("Озвучивать голосом", isOn: $speakReplies)
            }

            Section("Свой сервер") {
                TextField("Base URL", text: $baseURL)
                    .textInputAutocapitalization(.never)
                Text("Любой OpenAI-совместимый сервер (например, свой бэкенд или api.x.ai/v1). По умолчанию — Groq.")
                    .font(.footnote)
                    .foregroundStyle(.secondary)
            }

            Section {
                Button("Очистить историю", role: .destructive, action: onClearHistory)
            }
        }
        .navigationTitle("Настройки")
    }
}

#Preview {
    NavigationStack {
        SettingsView()
    }
}
