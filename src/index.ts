export interface Env {
	// If you set another name in wrangler.toml as the value for 'binding',
	// replace "AI" with the variable name you defined.
	AI: Ai;
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		// base keywords
		const randomKeywords = [
			'stars',
			'galaxies',
			'nebulae',
			'cosmic dust',
			'deep space',
			'vibrant colors',
			'high resolution',
			'distant planets',
			'glowing effects',
			'shooting star',
			'milky way',
			'dark background',
			'3D rendering',
			'ethereal atmosphere',
		];
		const promptWords = ['space wallpaper', 'anime'];
		for (let i = 0; i < 10; i++) {
			promptWords.push(randomKeywords[Math.floor(Math.random() * randomKeywords.length)]);
		}

		// add random string
		const randomString = Math.random().toString(36).slice(-8);
		promptWords.push(randomString);

		// generate image
		const response = await env.AI.run('@cf/lykon/dreamshaper-8-lcm', {
			prompt: promptWords.join(', '),
		});

		return new Response(response, {
			headers: {
				'content-type': 'image/png',
			},
		});
	},
} satisfies ExportedHandler<Env>;
