export function randomizeCharacter(fakers, schema, locale) {
    const fk = fakers[locale];
    const isFa = locale === 'fa';
    let form = {};

    const deepClone = (obj) => JSON.parse(JSON.stringify(obj));
    Object.keys(schema).forEach(sectionKey => {
      form[sectionKey] = form[sectionKey] || {};
      const sectionSchema = schema[sectionKey];
      if (Array.isArray(sectionSchema)) {
        sectionSchema.forEach(field => {
          form[sectionKey][field.key] = deepClone(field.default ?? (field.type === 'array' ? [] : ''));
        });
      } else {
        Object.keys(sectionSchema).forEach(fieldKey => {
          const field = sectionSchema[fieldKey];
          if(field.type === 'array') form[sectionKey][fieldKey] = deepClone(field.default ?? []);
          else if (field.type === 'traits') form[sectionKey][fieldKey] = [];
          else form[sectionKey][fieldKey] = '';
        });
      }
    });
    form.family.spouse = null;
    form.family.children = [];

    const getAge = (dob) => {
        if (!dob) return 0;
        const today = new Date();
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
        return age;
    };

    const iranianLocations = [
        { city: 'تهران', accent: 'تهرانی', languages: ['فارسی'] }, { city: 'اصفهان', accent: 'اصفهانی', languages: ['فارسی'] },
        { city: 'تبریز', accent: 'ترکی', languages: ['ترکی', 'فارسی'] }, { city: 'مشهد', accent: 'مشهدی', languages: ['فارسی'] },
        { city: 'شیراز', accent: 'شیرازی', languages: ['فارسی'] }, { city: 'سنندج', accent: 'کردی', languages: ['کردی', 'فارسی'] },
        { city: 'اهواز', accent: 'جنوبی', languages: ['فارسی', 'عربی'] },
    ];
    const worldLocations = [
        { country: 'United States', nationality: 'American', cities: ['New York', 'Los Angeles', 'Chicago'], mainLanguage: 'English', accents: ['New York', 'Californian', 'Midwestern'] },
        { country: 'France', nationality: 'French', cities: ['Paris', 'Marseille', 'Lyon'], mainLanguage: 'French', accents: ['Parisian', 'Southern French'] },
        { country: 'Japan', nationality: 'Japanese', cities: ['Tokyo', 'Osaka', 'Kyoto'], mainLanguage: 'Japanese', accents: ['Tokyo', 'Kansai'] },
        { country: 'Germany', nationality: 'German', cities: ['Berlin', 'Munich', 'Hamburg'], mainLanguage: 'German', accents: ['Berliner', 'Bavarian'] },
        { country: 'Brazil', nationality: 'Brazilian', cities: ['São Paulo', 'Rio de Janeiro'], mainLanguage: 'Portuguese', accents: ['Paulista', 'Carioca'] },
    ];
    
    let nationality, birth_place, residence, languages, accent;
    if (isFa) {
        const birthLocation = fk.helpers.arrayElement(iranianLocations);
        nationality = 'ایرانی'; birth_place = birthLocation.city;
        languages = [...birthLocation.languages]; if (Math.random() < 0.7) languages.push('انگلیسی');
        accent = birthLocation.accent; residence = fk.helpers.weightedArrayElement([{weight: 7, value: birth_place}, {weight: 3, value: fk.helpers.arrayElement(iranianLocations).city}]);
    } else {
        const worldLocation = fk.helpers.arrayElement(worldLocations);
        nationality = worldLocation.nationality; birth_place = fk.helpers.arrayElement(worldLocation.cities);
        languages = [worldLocation.mainLanguage]; if (worldLocation.mainLanguage !== 'English' && Math.random() < 0.9) languages.push('English');
        accent = fk.helpers.arrayElement(worldLocation.accents); residence = fk.helpers.weightedArrayElement([{weight: 7, value: birth_place}, {weight: 3, value: fk.helpers.arrayElement(worldLocation.cities)}]);
    }

    const characterGender = fk.helpers.arrayElement(schema.identity.find(f => f.key === 'gender').options);
    const fatherLastName = isFa ? fk.person.lastName() : fk.person.lastName('male');
    let paternalLastName, characterLastName, spouseLastName;

    characterLastName = fatherLastName;
    if (characterGender === 'male') {
        paternalLastName = fatherLastName;
        spouseLastName = isFa ? fk.person.lastName() : fk.person.lastName('female');
        if (Math.random() < 0.3) spouseLastName = paternalLastName;
    } else {
        paternalLastName = isFa ? fk.person.lastName() : fk.person.lastName('male');
        spouseLastName = paternalLastName;
    }
    
    form.family.father_name = fk.person.firstName('male') + ' ' + fatherLastName;
    form.family.father_status = fk.helpers.arrayElement(schema.family.find(f => f.key === 'father_status').options);
    form.family.mother_name = fk.person.firstName('female') + ' ' + (isFa ? fk.person.lastName() : fk.person.lastName('female'));
    form.family.mother_status = fk.helpers.arrayElement(schema.family.find(f => f.key === 'mother_status').options);

    const dob = fk.date.birthdate({ min: 18, max: 80, mode: 'age' });
    const age = getAge(dob);
    
    form.identity = {
        name: fk.person.firstName(characterGender) + ' ' + characterLastName,
        dob: dob.toISOString().split('T')[0],
        is_alive: fk.helpers.weightedArrayElement([{weight: 9, value: true}, {weight: 1, value: false}]),
        gender: characterGender,
        marital_status: fk.helpers.arrayElement(schema.identity.find(f => f.key === 'marital_status').options),
        nationality, birth_place, residence, languages,
        occupation: fk.helpers.arrayElement(isFa ? ['معلم', 'مهندس نرم‌افزار', 'پزشک عمومی', 'جراح مغز و اعصاب', 'هنرمند تجسمی', 'نویسنده', 'نجار', 'راننده تاکسی', 'برنامه‌نویس وب', 'آشپز', 'مغازه‌دار', 'وکیل', 'استاد دانشگاه', 'دانشمند داده', 'معمار', 'گرافیست', 'خلبان', 'روزنامه‌نگار', 'عکاس'] : ['Teacher', 'Software Engineer', 'General Practitioner', 'Neurosurgeon', 'Visual Artist', 'Writer', 'Carpenter', 'Taxi Driver', 'Web Developer', 'Chef', 'Shopkeeper', 'Lawyer', 'Professor', 'Data Scientist', 'Architect', 'Graphic Designer', 'Pilot', 'Journalist', 'Photographer']),
    };
    form.identity.dod = form.identity.is_alive ? '' : fk.date.past({years: Math.min(age, 15), refDate: new Date()}).toISOString().split('T')[0];
    
    if (form.identity.marital_status !== 'single' && age > 20) {
        const spouseGender = characterGender === 'male' ? 'female' : 'male';
        const spouseDob = fk.date.birthdate({min: Math.max(18, age - 5), max: age + 5, mode: 'age'});
        form.family.spouse = {
            name: fk.person.firstName(spouseGender) + ' ' + spouseLastName,
            dob: spouseDob.toISOString().split('T')[0],
            status: fk.helpers.weightedArrayElement([{weight: 9, value: 'alive'}, {weight: 1, value: 'deceased'}])
        };

        const canHaveChildren = form.identity.marital_status === 'married' || form.identity.marital_status === 'widowed';
        if (canHaveChildren && age > 22) {
            const numChildren = fk.number.int({min: 0, max: 4});
            const motherDob = (characterGender === 'female' ? new Date(dob) : new Date(spouseDob));
            for (let i = 0; i < numChildren; i++) {
                const earliestBirthYear = motherDob.getFullYear() + 18;
                const latestBirthYear = motherDob.getFullYear() + 45;
                const validStartYear = earliestBirthYear;
                const validEndYear = Math.min(latestBirthYear, new Date().getFullYear());
                if(validStartYear >= validEndYear) continue;
                
                const childBirthYear = fk.number.int({min: validStartYear, max: validEndYear});
                const childDob = fk.date.between({ from: new Date(childBirthYear, 0, 1), to: new Date(childBirthYear, 11, 31) });
                const childGender = fk.helpers.arrayElement(['male', 'female']);
                form.family.children.push({
                    name: fk.person.firstName(childGender) + ' ' + paternalLastName,
                    dob: childDob.toISOString().split('T')[0],
                    gender: childGender,
                    status: fk.helpers.weightedArrayElement([{weight: 19, value: 'alive'}, {weight: 1, value: 'deceased'}])
                });
            }
        }
    }
    
    let height, weight;
    if (age <= 1) { height = fk.number.int({ min: 50, max: 75 }); weight = fk.number.int({ min: 3, max: 10 }); } 
    else if (age <= 12) { height = 75 + (age - 1) * 6; weight = 10 + (age - 1) * 2.5; } 
    else if (age <= 20) { height = 140 + (age - 12) * (characterGender === 'male' ? 4 : 3); weight = 35 + (age - 12) * 4; } 
    else { height = characterGender === 'male' ? fk.number.int({ min: 165, max: 195 }) : fk.number.int({ min: 155, max: 180 }); const baseWeight = (height - 100) * 0.9; weight = Math.round(baseWeight + fk.number.int({min: -10, max: 15})); }
    form.physical = {
        height_cm: Math.min(Math.round(height), 250), weight_kg: Math.min(Math.round(weight), 300),
        skin_tone: fk.helpers.arrayElement(schema.physical.find(f => f.key === 'skin_tone').options),
        build: fk.helpers.arrayElement(schema.physical.find(f => f.key === 'build').options),
        clothing_style: fk.helpers.arrayElement(schema.physical.find(f => f.key === 'clothing_style').options),
        hair_color: fk.helpers.arrayElement(schema.physical.find(f => f.key === 'hair_color').options),
        eye_color: fk.helpers.arrayElement(schema.physical.find(f => f.key === 'eye_color').options),
        face_shape: fk.helpers.arrayElement(schema.physical.find(f => f.key === 'face_shape').options),
        distinguishing_marks: fk.helpers.arrayElements(isFa ? ['خال روی گونه چپ', 'جای زخم کوچک روی پیشانی', 'تتو روی مچ دست', 'کک و مک روی بینی', 'چشمانی نافذ', 'ابروهای پرپشت'] : ['mole on left cheek', 'small scar on forehead', 'tattoo on wrist', 'freckles across nose', 'piercing eyes', 'thick eyebrows'], {min: 1, max: 2})
    };
    form.psychology = {
      personality_type: fk.helpers.arrayElement(schema.psychology.personality_type.options),
      traits: fk.helpers.arrayElements(schema.psychology.traits.options, {min:4, max:7}).map(tr => ({ name: tr, intensity: Math.round(fk.number.int({ min: 20, max: 95 }) / 5) * 5 })),
      values: fk.helpers.arrayElements(isFa ? ['صداقت', 'رشد', 'خانواده', 'آزادی', 'احترام', 'امنیت', 'خلاقیت'] : ['Honesty', 'Growth', 'Family', 'Freedom', 'Respect', 'Security', 'Creativity'], {min:2, max:4}),
      fears: fk.helpers.arrayElements(isFa ? ['عنکبوت', 'ارتفاع', 'سخنرانی عمومی', 'شکست', 'تنهایی', 'فضای بسته'] : ['Spiders', 'Heights', 'Public Speaking', 'Failure', 'Loneliness', 'Claustrophobia'], {min:1, max:3})
    };
    form.voice = {
      voice_gender: fk.helpers.arrayElement(schema.voice.find(f => f.key === 'voice_gender').options),
      tone: fk.helpers.arrayElement(schema.voice.find(f => f.key === 'tone').options),
      pace: fk.helpers.arrayElement(schema.voice.find(f => f.key === 'pace').options),
      accent: accent,
      catchphrases: fk.helpers.arrayElements(isFa ? ['در واقع...', 'می‌دونی چی میگم؟', 'خلاصه که...', 'عملاً', 'به هر حال...'] : ['You know?', 'Actually...', 'Basically...', 'Long story short...', 'At the end of the day...'], {min:1, max:2})
    };
    form.movement = {
      posture: fk.helpers.arrayElement(schema.movement.find(f => f.key === 'posture').options),
      gait: fk.helpers.arrayElement(schema.movement.find(f => f.key === 'gait').options),
      gestures: fk.helpers.arrayElements(isFa ? ['با دست زیاد اشاره می‌کند', 'هنگام فکر کردن سرش را می‌خاراند', 'لبخندهای کوتاه می‌زند', 'قدم‌های محکم برمی‌دارد'] : ['Nods frequently', 'Uses hands when talking', 'Taps fingers when impatient', 'Confident stride'], {min:1, max:2}),
      notes: isFa ? 'معمولاً تماس چشمی طولانی برقرار نمی‌کند و وقتی عصبی است با انگشتانش بازی می‌کند.' : 'Tends to avoid long eye contact and fidgets when nervous.'
    };
    form.health = {
      medical_conditions