export default function VideoresponseReshaping(data) {

    let totalAI = 0;

    for (const frame of data.output) {
        const ai = frame.classes.find(
            c => c.class === "ai_generated"
        );

        totalAI += ai.value;
    }

    const aiProbability =
        (totalAI / data.output.length) * 100;

    const realProbability = 100 - aiProbability;

    let certainty;

    if (aiProbability < 30)
        certainty = "Low";
    else if (aiProbability < 70)
        certainty = "Medium";
    else
        certainty = "High";

    return {
        is_ai: aiProbability >= 50,
        prediction: aiProbability >= 50 ? "Fake" : "Real",
        ai_probability: aiProbability.toFixed(2),
        real_probability: realProbability.toFixed(2),
        certainity_level: certainty,
        createdAt: new Date()
    };
}