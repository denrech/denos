import Foundation

enum Secrets {
    /// Ключ можно вписать сюда перед сборкой, чтобы не вводить его на часах.
    /// Бесплатный ключ Groq: https://console.groq.com/keys
    /// Ключ, введённый в настройках на часах, имеет приоритет над этим значением.
    static let groqAPIKey = ""
}
