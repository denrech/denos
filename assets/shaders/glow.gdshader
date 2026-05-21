shader_type canvas_item;

uniform vec4 glow_color : source_color = vec4(0.3, 0.7, 1.0, 1.0);
uniform float glow_strength : hint_range(0.0, 3.0) = 1.5;
uniform float glow_size : hint_range(1.0, 8.0) = 3.0;

void fragment() {
	vec4 pixel = texture(TEXTURE, UV);

	float glow = 0.0;
	int samples = 0;
	for (float dx = -glow_size; dx <= glow_size; dx += 1.0) {
		for (float dy = -glow_size; dy <= glow_size; dy += 1.0) {
			glow += texture(TEXTURE, UV + vec2(dx, dy) * TEXTURE_PIXEL_SIZE).a;
			samples++;
		}
	}
	glow /= float(samples);

	vec4 out_color = pixel;
	if (pixel.a < 0.01) {
		out_color = glow_color * glow * glow_strength;
		out_color.a = glow * glow_color.a * glow_strength;
	}
	COLOR = out_color;
}
