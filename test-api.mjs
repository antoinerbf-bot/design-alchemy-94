import { GoogleGenerativeAI } from '@google/generative-ai';

(async () => {
    try {
        const genAI = new GoogleGenerativeAI('AIzaSyB2emZbmeyGWvpTGJ3BfMz_8HgacDecjec');
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const result = await model.generateContent('hello');
        console.log('Success:', result.response.text());
    } catch (e) {
        console.error('ERROR:', e.message);
    }
})();
