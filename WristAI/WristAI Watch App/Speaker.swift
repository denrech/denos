import AVFoundation
import Foundation

/// Озвучивает ответы ассистента встроенным синтезатором речи (офлайн, бесплатно).
final class Speaker {
    private let synthesizer = AVSpeechSynthesizer()

    func speak(_ text: String) {
        let session = AVAudioSession.sharedInstance()
        try? session.setCategory(.playback, mode: .spokenAudio, options: [.duckOthers])
        try? session.setActive(true)

        let utterance = AVSpeechUtterance(string: text)
        let isCyrillic = text.range(of: "\\p{Cyrillic}", options: .regularExpression) != nil
        utterance.voice = AVSpeechSynthesisVoice(language: isCyrillic ? "ru-RU" : "en-US")
        utterance.rate = AVSpeechUtteranceDefaultSpeechRate

        synthesizer.stopSpeaking(at: .immediate)
        synthesizer.speak(utterance)
    }

    func stop() {
        synthesizer.stopSpeaking(at: .immediate)
    }
}
