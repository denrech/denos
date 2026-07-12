import SwiftUI

struct ContentView: View {
    @StateObject private var viewModel = ChatViewModel()
    @StateObject private var recorder = AudioRecorder()
    @State private var draft = ""

    var body: some View {
        ScrollViewReader { proxy in
            ScrollView {
                LazyVStack(alignment: .leading, spacing: 6) {
                    if viewModel.messages.isEmpty && !viewModel.isBusy {
                        Text("Нажмите микрофон и надиктуйте вопрос — ассистент ответит текстом и голосом.")
                            .font(.footnote)
                            .foregroundStyle(.secondary)
                            .padding(.top, 8)
                    }

                    ForEach(viewModel.messages) { message in
                        MessageBubble(message: message)
                            .id(message.id)
                    }

                    if viewModel.isBusy {
                        HStack(spacing: 6) {
                            ProgressView()
                                .frame(width: 16, height: 16)
                            Text(viewModel.statusText)
                                .font(.footnote)
                                .foregroundStyle(.secondary)
                        }
                        .id("busy")
                    }

                    if let error = viewModel.errorText {
                        Text(error)
                            .font(.footnote)
                            .foregroundStyle(.red)
                    }

                    if recorder.permissionDenied {
                        Text("Нет доступа к микрофону. Разрешите его в Настройках часов.")
                            .font(.footnote)
                            .foregroundStyle(.red)
                    }
                }
            }
            .onChange(of: viewModel.messages) { _, newMessages in
                if let last = newMessages.last {
                    withAnimation {
                        proxy.scrollTo(last.id, anchor: .bottom)
                    }
                }
            }
        }
        .safeAreaInset(edge: .bottom) { inputBar }
        .navigationTitle("WristAI")
        .toolbar {
            ToolbarItem(placement: .topBarTrailing) {
                NavigationLink {
                    SettingsView(onClearHistory: viewModel.clearHistory)
                } label: {
                    Image(systemName: "gearshape.fill")
                }
            }
        }
    }

    private var inputBar: some View {
        HStack(spacing: 8) {
            TextField("Сообщение", text: $draft)
                .font(.footnote)
                .onSubmit(sendDraft)

            Button(action: toggleRecording) {
                Image(systemName: recorder.isRecording ? "stop.circle.fill" : "mic.circle.fill")
                    .font(.title2)
                    .foregroundStyle(recorder.isRecording ? Color.red : Color.accentColor)
                    .symbolEffect(.pulse, isActive: recorder.isRecording)
            }
            .buttonStyle(.plain)
            .disabled(viewModel.isBusy)
        }
        .padding(.horizontal, 4)
        .padding(.top, 4)
        .background(.ultraThinMaterial)
    }

    private func sendDraft() {
        let text = draft
        draft = ""
        viewModel.send(text: text)
    }

    private func toggleRecording() {
        if recorder.isRecording {
            if let url = recorder.stop() {
                viewModel.sendVoice(fileURL: url)
            }
        } else {
            Task { await recorder.start() }
        }
    }
}

struct MessageBubble: View {
    let message: ChatMessage

    var body: some View {
        HStack {
            if message.role == .user { Spacer(minLength: 12) }
            Text(message.text)
                .font(.footnote)
                .padding(.horizontal, 8)
                .padding(.vertical, 6)
                .background(
                    message.role == .user ? Color.blue.opacity(0.35) : Color.gray.opacity(0.25),
                    in: RoundedRectangle(cornerRadius: 10)
                )
            if message.role == .assistant { Spacer(minLength: 12) }
        }
    }
}

#Preview {
    NavigationStack {
        ContentView()
    }
}
