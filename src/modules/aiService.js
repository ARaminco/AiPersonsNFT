export async function generateImage(apiKey, provider, characterData, locale, t) {
    if (provider !== 'openai') {
        throw new Error('Only OpenAI is currently supported.');
    }

    const prompt = createImagePrompt(characterData, locale, t);

    const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "dall-e-3",
            prompt: prompt,
            n: 1,
            size: "1024x1024",
            quality: "standard"
        })
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error('OpenAI API Error:', errorData);
        throw new Error(errorData.error.message || 'Failed to generate image.');
    }

    const data = await response.json();
    return data.data[0].url;
}

function createImagePrompt(data, locale, t) {
    const { identity, physical, psychology } = data;
    const age = new Date().getFullYear() - new Date(identity.dob).getFullYear();

    let prompt = `Digital painting, photorealistic portrait of a ${age}-year-old ${t(identity.gender)}, ${identity.nationality}. `;
    prompt += `Physical features: ${t(physical.build)} build, ${physical.height_cm}cm tall, ${t(physical.skin_tone)} skin, ${t(physical.hair_color)} hair, ${t(physical.eye_color)} eyes, and an ${t(physical.face_shape)} face. `;
    prompt += `They are a(n) ${identity.occupation}. `;
    
    const mainTrait = psychology.traits[0]?.name;
    if (mainTrait) {
        prompt += `Their expression reflects a personality that is ${t(mainTrait)}. `;
    }
    if (physical.clothing_style) {
        prompt += `Dressed in a ${t(physical.clothing_style)} style. `;
    }
    
    prompt += 'Detailed face, cinematic lighting, high detail, 8k.';

    if (locale === 'fa') {
        prompt += ' The character should have features typical of their described nationality and region.';
    }

    return prompt;
}