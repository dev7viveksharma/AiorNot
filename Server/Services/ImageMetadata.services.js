export default  function fetchimagemetadata(imageresult){
        const certainty_level = () =>{
                    if(imageresult.type.ai_generated < 0.3){
                    return "Low";
                    }
                    else if(imageresult.type.ai_generated >= 0.5){
                    return "medium";
                    }
        
                    return "High";
                }
        
        const summary = () =>{
            if(imageresult.type.ai_generated > 0.5){
            let maxKey = null;
            let maxValue = 0.5;
            if(imageresult.type?.ai_generators){
                for (const key in imageresult.type.ai_generators) {
                    if (imageresult.type.ai_generators[key] > maxValue) {
                    maxValue = imageresult.type.ai_generators[key];
                    maxKey = key;
                    }
                }

                return `this image most probabily made using ${maxKey} `;
                }
                return `this image most probabily made using AI`;
            }
            return "this image has a very low certainty to be made by AI";
        }

       const buildType = ()=> {
            const typeData = {
                ai_generated: imageresult.type?.ai_generated
            };

           if (imageresult.type?.ai_generators) {
                typeData.ai_generators = imageresult.type.ai_generators;
            }

            return typeData;
        }
        

    return {
            is_ai : imageresult.type.ai_generated > 0.5,
            prediction : imageresult.type.ai_generated > 0.5 ? "Fake" : "Real",
            ai_probability : imageresult.type.ai_generated,
            real_probability : 1.0 - imageresult.type.ai_generated,
            certainty_level: certainty_level(),
            type : buildType(),
            reasoning_summary : summary(),
            createdAt: new Date()
        };    
  }