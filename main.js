import Alpine from 'alpinejs';
import { Faker, en, fa } from '@faker-js/faker';

import 'bootstrap/dist/css/bootstrap.rtl.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './style.css';

Alpine.data('app', () => ({
  locale:'fa',
  activeTab: 'identity',
  fakers: {},
  copyStatus: 'copy',
  i18n:{
    fa:{
      identity:'هویت', family: 'شجره‌نامه', physical:'ظاهر', psychology:'روانشناسی', voice:'صدا', movement:'حرکات', health:'سلامت و بیوگرافی',
      parents: 'والدین', spouse: 'همسر', children: 'فرزندان', status: 'وضعیت', age: 'سن',
      select_option:'انتخاب کنید', randomize:'ایجاد رندوم', build_json:'ساخت JSON', copy:'کپی', copied: 'کپی شد!', download:'دانلود',
      name:'نام کامل', dob:'تاریخ تولد', is_alive:'در قید حیات', dod:'تاریخ فوت', gender:'جنسیت', nationality:'ملیت', birth_place:'محل تولد',
      marital_status:'وضعیت تاهل', father_name:"نام پدر", mother_name:"نام مادر", father_status:"وضعیت پدر", mother_status:"وضعیت مادر",
      languages:'زبان‌ها', residence:'محل زندگی', occupation:'شغل', description:'توضیح کوتاه',
      height_cm:'قد (cm)', weight_kg:'وزن (kg)', skin_tone: 'رنگ پوست', build: 'نوع هیکل', clothing_style: 'سبک لباس', eye_color:'رنگ چشم', hair_color:'رنگ مو', 
      face_shape:'شکل صورت', nose_shape:'شکل بینی', mouth_shape:'شکل لب/دهان', jawline:'خط فک', eyebrows:'ابرو‌ها', distinguishing_marks:'علائم خاص',
      personality_type:'تیپ شخصیتی (MBTI)', traits:'صفات شخصیتی', values:'ارزش‌ها', fears:'ترس‌ها', add_custom_trait:'افزودن صفت سفارشی', custom_trait_placeholder: 'نام صفت (انگلیسی)',
      voice_gender:'جنس صدا', tone:'لحن', pace:'سرعت صحبت', accent:'لهجه', catchphrases:'تکه‌کلام‌ها',
      posture:'حالت بدن', gait:'الگوی راه‌رفتن', gestures:'ژست‌ها', notes:'یادداشت‌های حرکتی',
      medical_conditions:'بیماری‌ها/شرایط پزشکی', bio:'بیوگرافی', output_json:'خروجی JSON',
      male:'مرد', female:'زن', other:'دیگر', single:'مجرد', married:'متاهل', divorced:'مطلقه', widowed:'بیوه', alive:'زنده', deceased:'فوت شده',
      fair: 'روشن', light: 'گندمی', olive: 'سبزه', brown: 'تیره', dark: 'بسیار تیره',
      slim: 'لاغر', athletic: 'ورزشکار', average: 'متوسط', stout: 'چهارشانه', muscular: 'عضلانی', heavy: 'درشت',
      casual: 'روزمره', formal: 'رسمی', vintage: 'کلاسیک', modern: 'مدرن', sporty: 'اسپرت',
      brown_eye:'قهوه‌ای', black_eye:'مشکی', blue:'آبی', green:'سبز', gray:'خاکستری', hazel:'عسلی',
      black_hair:'مشکی', brown_hair:'قهوه‌ای', blonde:'بلوند', red:'قرمز', gray_hair:'خاکستری', white:'سفید',
      oval:'بیضی', round:'گرد', square:'مربع', heart:'قلبی', long:'کشیده',
      kind:'مهربان', curious:'کنجکاو', aggressive:'پرخاشگر', patient:'صبور', brave:'شجاع', anxious:'مضطرب', optimistic:'خوش‌بین', pessimistic:'بدبین',
      perfectionist:'کمال‌گرا', impulsive:'شتاب‌زده', creative:'خلاق', analytical:'تحلیل‌گر', dominant:'سلطه‌گر', submissive:'فرمان‌بردار', humorous:'شوخ‌طبع',
      serious:'جدی', empathetic:'همدل', stoic:'خویشتن‌دار', ambitious:'بلندپرواز', lazy:'تنبل',
      calm:'آرام', energetic:'پرانرژی', warm:'گرم', cold:'سرد',
      slow:'آهسته', moderate:'متوسط', fast:'سریع',
      straight_posture:'صاف', relaxed:'راحت', slouched:'خمیده',
      medium_gait:'معمولی', confident:'با اعتماد به نفس', limping:'لنگان',
      neutral:'خنثی'
    },
    en:{
      identity:'Identity', family: 'Family Tree', physical:'Appearance', psychology:'Psychology', voice:'Voice', movement:'Movement', health:'Health & Bio',
      parents: 'Parents', spouse: 'Spouse', children: 'Children', status: 'Status', age: 'Age',
      select_option:'Select...', randomize:'Randomize', build_json:'Build JSON', copy:'Copy', copied: 'Copied!', download:'Download',
      name:'Full Name', dob:'Date of Birth', is_alive:'Is Alive', dod:'Date of Death', gender:'Gender', nationality:'Nationality', birth_place:'Birth Place',
      marital_status:'Marital Status', father_name:"Father's Name", mother_name:"Mother's Name", father_status:"Father's Status", mother_status:"Mother's Status",
      languages:'Languages', residence:'Residence', occupation:'Occupation', description:'Short Description',
      height_cm:'Height (cm)', weight_kg:'Weight (kg)', skin_tone: 'Skin Tone', build: 'Build', clothing_style: 'Clothing Style', eye_color:'Eye Color', hair_color:'Hair Color',
      face_shape:'Face Shape', nose_shape:'Nose Shape', mouth_shape:'Mouth Shape', jawline:'Jawline', eyebrows:'Eyebrows', distinguishing_marks:'Distinguishing Marks',
      personality_type:'Personality Type (MBTI)', traits:'Personality Traits', values:'Values', fears:'Fears', add_custom_trait:'Add Custom Trait', custom_trait_placeholder: 'Trait name (english)',
      voice_gender:'Voice Gender', tone:'Tone', pace:'Speech Pace', accent:'Accent', catchphrases:'Catchphrases',
      posture:'Posture', gait:'Gait', gestures:'Gestures', notes:'Movement Notes',
      medical_conditions:'Medical Conditions', bio:'Biography', output_json:'Output JSON',
      male:'Male', female:'Female', other:'Other', single:'Single', married:'Married', divorced:'Divorced', widowed:'Widowed', alive:'Alive', deceased:'Deceased',
      fair: 'Fair', light: 'Light', olive: 'Olive', brown: 'Brown', dark: 'Dark',
      slim: 'Slim', athletic: 'Athletic', average: 'Average', stout: 'Stout', muscular: 'Muscular', heavy: 'Heavy',
      casual: 'Casual', formal: 'Formal', vintage: 'Vintage', modern: 'Modern', sporty: 'Sporty',
      brown_eye:'Brown', black_eye:'Black', blue:'Blue', green:'Green', gray:'Gray', hazel:'Hazel',
      black_hair:'Black', brown_hair:'Brown', blonde:'Blonde', red:'Red', gray_hair:'Gray', white:'White',
      oval:'Oval', round:'Round', square:'Square', heart:'Heart', long:'Long',
      kind:'Kind', curious:'Curious', aggressive:'Aggressive', patient:'Patient', brave:'Brave', anxious:'Anxious', optimistic:'Optimistic', pessimistic:'Pessimistic',
      perfectionist:'Perfectionist', impulsive:'Impulsive', creative:'Creative', analytical:'Analytical', dominant:'Dominant', submissive:'Submissive', humorous:'Humorous',
      serious:'Serious', empathetic:'Empathetic', stoic:'Stoic', ambitious:'Ambitious', lazy:'Lazy',
      calm:'Calm', energetic:'Energetic', warm:'Warm', cold:'Cold',
      slow:'Slow', moderate:'Moderate', fast:'Fast',
      straight_posture:'Straight', relaxed:'Relaxed', slouched:'Slouched',
      medium_gait:'Medium', confident:'Confident', limping:'Limping',
      neutral:'Neutral'
    }
  },
  schema:{
    identity:[
      {key:'name', type:'string', label:'name', default:''},
      {key:'dob', type:'date', label:'dob', default:''},
      {key:'is_alive', type:'boolean', label:'is_alive', default: true},
      {key:'dod', type:'date', label:'dod', default:''},
      {key:'gender', type:'enum', label:'gender', options:['male','female'], default:''},
      {key:'marital_status', type:'enum', label:'marital_status', options:['single','married','divorced','widowed'], default:''},
      {key:'nationality', type:'string', label:'nationality', default:''},
      {key:'birth_place', type:'string', label:'birth_place', default:''},
      {key:'residence', type:'string', label:'residence', default:''},
      {key:'occupation', type:'string', label:'occupation', default:''},
      {key:'languages', type:'array', label:'languages', default:[]},
      {key:'description', type:'textarea', label:'description', default:''},
    ],
    family: [
        { key: 'father_name', type: 'string', label: 'father_name', group: 'parents' },
        { key: 'father_status', type: 'enum', label: 'father_status', group: 'parents', options:['alive','deceased'] },
        { key: 'mother_name', type: 'string', label: 'mother_name', group: 'parents' },
        { key: 'mother_status', type: 'enum', label: 'mother_status', group: 'parents', options:['alive','deceased'] },
    ],
    physical:[
      {key:'height_cm', type:'number', label:'height_cm', min:50, max:250, default:175, suffix:'cm'},
      {key:'weight_kg', type:'number', label:'weight_kg', min:3, max:300, default:75, suffix:'kg'},
      {key:'skin_tone', type:'enum', label:'skin_tone', options:['fair', 'light', 'olive', 'brown', 'dark']},
      {key:'build', type:'enum', label:'build', options:['slim', 'athletic', 'average', 'stout', 'muscular', 'heavy']},
      {key:'clothing_style', type:'enum', label:'clothing_style', options:['casual', 'formal', 'vintage', 'modern', 'sporty']},
      {key:'hair_color', type:'enum', label:'hair_color', options:['black_hair','brown_hair','blonde','red','gray_hair','white']},
      {key:'eye_color', type:'enum', label:'eye_color', options:['brown_eye','black_eye','blue','green','gray','hazel']},
      {key:'face_shape', type:'enum', label:'face_shape', options:['oval','round','square','heart','long']},
      {key:'distinguishing_marks', type:'array', label:'distinguishing_marks', default:[]},
    ],
    psychology:{
      personality_type:{type:'enum', options:['INTJ','INTP','INFJ','INFP','ISTJ','ISTP','ISFJ','ISFP','ENTJ','ENTP','ENFJ','ENFP','ESTJ','ESTP','ESFJ','ESFP']},
      traits:{type:'traits', options:['kind','curious','aggressive','patient','brave','anxious','optimistic','pessimistic','perfectionist','impulsive','creative','analytical','dominant','submissive','humorous','serious','empathetic','stoic','ambitious','lazy']},
      values:{type:'array', default:['honesty']},
      fears:{type:'array', default:['failure']}
    },
    voice:[
      {key:'voice_gender', type:'enum', label:'voice_gender', options:['male','female','neutral']},
      {key:'tone', type:'enum', label:'tone', options:['calm','energetic','formal','casual','warm','cold']},
      {key:'pace', type:'enum', label:'pace', options:['slow','moderate','fast']},
      {key:'accent', type:'string', label:'accent'},
      {key:'catchphrases', type:'array', label:'catchphrases'},
    ],
    movement:[
      {key:'posture', type:'enum', label:'posture', options:['straight_posture','relaxed','slouched']},
      {key:'gait', type:'enum', label:'gait', options:['slow','medium_gait','fast','confident','limping']},
      {key:'gestures', type:'array', label:'gestures'},
      {key:'notes', type:'string', label:'notes'},
    ],
    health:[
      {key:'medical_conditions', type:'array', label:'medical_conditions'},
      {key:'bio', type:'textarea', label:'bio'},
    ]
  },
  form:{ identity:{}, family:{ spouse: null, children: [] }, physical:{}, psychology:{}, voice:{}, movement:{}, health:{} },
  temp:{inputs:{}, customTrait:{name:'', intensity:50}},
  output:'',
  
  init(){
    this.fakers = {
      en: new Faker({ locale: en }),
      fa: new Faker({ locale: [fa, en] })
    };
    this.resetForm();
    this.buildOutput();
  },

  resetForm() {
    const deepClone = (obj) => JSON.parse(JSON.stringify(obj));
    Object.keys(this.schema).forEach(sectionKey => {
      this.form[sectionKey] = this.form[sectionKey] || {};
      const sectionSchema = this.schema[sectionKey];
      if (Array.isArray(sectionSchema)) {
        sectionSchema.forEach(field => {
          this.form[sectionKey][field.key] = deepClone(field.default ?? (field.type === 'array' ? [] : ''));
          if (field.type === 'array') this.temp.inputs[field.key] = '';
        });
      } else {
        Object.keys(sectionSchema).forEach(fieldKey => {
          const field = sectionSchema[fieldKey];
          if(field.type === 'array') this.form[sectionKey][fieldKey] = deepClone(field.default ?? []);
          else if (field.type === 'traits') this.form[sectionKey][fieldKey] = [];
          else this.form[sectionKey][fieldKey] = '';
        });
      }
    });
    this.form.family.spouse = null;
    this.form.family.children = [];
  },

  t(k){return (this.i18n[this.locale]&&this.i18n[this.locale][k])||k.replace(/_hair|_eye/g, '')},

  getAge(dob) {
    if (!dob) return 0;
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
  },

  generateBio() {
    const { identity, family, psychology } = this.form;
    const age = this.getAge(identity.dob);
    const mainTraits = psychology.traits.slice(0, 2).map(t => this.t(t.name) || t.name).join(' و ');
    const mainValue = psychology.values[0] || '';

    if (this.locale === 'fa') {
      let bio = `${identity.name}، یک ${identity.occupation} ${age} ساله ساکن ${identity.residence} است. او که در ${identity.birth_place} به دنیا آمده، فردی ${mainTraits} شناخته می‌شود. مهم‌ترین ارزش در زندگی او ${mainValue} است.`;
      if (family.spouse) { bio += ` او با ${family.spouse.name} (${this.t('همسر')}, ${this.t(family.spouse.status)}) زندگی می‌کند.`}
      if (family.children.length > 0) { bio += ` آنها ${family.children.length} فرزند دارند.`}
      return bio;
    }
    
    let bio = `${identity.name}, a ${age}-year-old ${identity.occupation} residing in ${identity.residence}. Born in ${identity.birth_place}, they are known for being ${mainTraits}. Their core value is ${mainValue}.`;
    if (family.spouse) { bio += ` They live with ${family.spouse.name} (spouse, ${this.t(family.spouse.status)}).`}
    if (family.children.length > 0) { bio += ` They have ${family.children.length} children.`}
    return bio;
  },
  
  randomize() {
    this.resetForm();
    const fk = this.fakers[this.locale];
    const isFa = this.locale === 'fa';

    // === 1. Define Family Names ===
    const characterGender = fk.helpers.arrayElement(this.schema.identity.find(f => f.key === 'gender').options);
    const fatherLastName = isFa ? fk.person.lastName() : fk.person.lastName('male');
    let paternalLastName, characterLastName;

    if (characterGender === 'male') {
        paternalLastName = fatherLastName;
        characterLastName = fatherLastName;
    } else { // Character is female, she keeps her father's last name
        characterLastName = fatherLastName;
        // The family name will be determined by her future spouse
        paternalLastName = isFa ? fk.person.lastName() : fk.person.lastName('male');
    }
    
    // === 2. Generate Parents ===
    this.form.family.father_name = fk.person.firstName('male') + ' ' + fatherLastName;
    this.form.family.father_status = fk.helpers.arrayElement(this.schema.family.find(f => f.key === 'father_status').options);
    this.form.family.mother_name = fk.person.firstName('female') + ' ' + (isFa ? fk.person.lastName() : fk.person.lastName('female'));
    this.form.family.mother_status = fk.helpers.arrayElement(this.schema.family.find(f => f.key === 'mother_status').options);

    // === 3. Generate Main Character ===
    const dob = fk.date.birthdate({ min: 18, max: 80, mode: 'age' });
    const age = this.getAge(dob);
    
    this.form.identity = {
        name: fk.person.firstName(characterGender) + ' ' + characterLastName,
        dob: dob.toISOString().split('T')[0],
        is_alive: fk.helpers.weightedArrayElement([{weight: 9, value: true}, {weight: 1, value: false}]),
        gender: characterGender,
        marital_status: fk.helpers.arrayElement(this.schema.identity.find(f => f.key === 'marital_status').options),
        nationality: isFa ? 'ایرانی' : fk.location.country(),
        birth_place: fk.location.city(),
        residence: fk.location.city(),
        occupation: fk.helpers.arrayElement(isFa ? ['معلم', 'مهندس', 'پزشک', 'هنرمند', 'نویسنده', 'نجار', 'راننده', 'برنامه‌نویس', 'آشپز', 'مغازه‌دار'] : ['Teacher', 'Engineer', 'Doctor', 'Artist', 'Writer', 'Carpenter', 'Driver', 'Developer', 'Chef', 'Shopkeeper']),
        languages: fk.helpers.arrayElements(isFa ? ['فارسی','انگلیسی','ترکی', 'ارمنی', 'کردی'] : ['English','Spanish','French','German', 'Mandarin'], {min:1, max:3}),
    };
    this.form.identity.dod = this.form.identity.is_alive ? '' : fk.date.past({years: Math.min(age, 15), refDate: new Date()}).toISOString().split('T')[0];
    
    // === 4. Generate Spouse & Children ===
    if (this.form.identity.marital_status !== 'single' && age > 20) {
        const spouseGender = characterGender === 'male' ? 'female' : 'male';
        const spouseDob = fk.date.birthdate({min: Math.max(18, age - 5), max: age + 5, mode: 'age'});
        const spouseLastName = (spouseGender === 'male') ? paternalLastName : paternalLastName; // Spouse takes the paternal last name
        this.form.family.spouse = {
            name: fk.person.firstName(spouseGender) + ' ' + spouseLastName,
            dob: spouseDob.toISOString().split('T')[0],
            status: fk.helpers.weightedArrayElement([{weight: 9, value: 'alive'}, {weight: 1, value: 'deceased'}])
        };

        const canHaveChildren = this.form.identity.marital_status !== 'divorced';
        if (canHaveChildren && age > 22) {
            const numChildren = fk.number.int({min: 0, max: 4});
            const motherDob = (characterGender === 'female' ? dob : spouseDob);
            for (let i = 0; i < numChildren; i++) {
                const earliestBirthYear = new Date(motherDob).getFullYear() + 18;
                const latestBirthYear = new Date(motherDob).getFullYear() + 45;
                if (latestBirthYear <= earliestBirthYear || new Date().getFullYear() < earliestBirthYear) continue;

                const childDob = fk.date.birthdate({ refDate: new Date(Math.min(new Date().getFullYear() - 1, latestBirthYear),1,1), min: 1, max: new Date().getFullYear() - earliestBirthYear });
                const childGender = fk.helpers.arrayElement(['male', 'female']);
                this.form.family.children.push({
                    name: fk.person.firstName(childGender) + ' ' + paternalLastName,
                    dob: childDob.toISOString().split('T')[0],
                    gender: childGender,
                    status: fk.helpers.weightedArrayElement([{weight: 19, value: 'alive'}, {weight: 1, value: 'deceased'}])
                });
            }
        }
    }
    
    // === 5. Generate Detailed Appearance ===
    let height, weight;
    if (age <= 1) { height = fk.number.int({ min: 50, max: 75 }); weight = fk.number.int({ min: 3, max: 10 }); } 
    else if (age <= 12) { height = 75 + (age - 1) * 6; weight = 10 + (age - 1) * 2.5; } 
    else if (age <= 20) { height = 140 + (age - 12) * (characterGender === 'male' ? 4 : 3); weight = 35 + (age - 12) * 4; } 
    else { height = characterGender === 'male' ? fk.number.int({ min: 165, max: 195 }) : fk.number.int({ min: 155, max: 180 }); const baseWeight = (height - 100) * 0.9; weight = Math.round(baseWeight + fk.number.int({min: -10, max: 15})); }
    this.form.physical = {
        height_cm: Math.min(Math.round(height), 250),
        weight_kg: Math.min(Math.round(weight), 300),
        skin_tone: fk.helpers.arrayElement(this.schema.physical.find(f => f.key === 'skin_tone').options),
        build: fk.helpers.arrayElement(this.schema.physical.find(f => f.key === 'build').options),
        clothing_style: fk.helpers.arrayElement(this.schema.physical.find(f => f.key === 'clothing_style').options),
        hair_color: fk.helpers.arrayElement(this.schema.physical.find(f => f.key === 'hair_color').options),
        eye_color: fk.helpers.arrayElement(this.schema.physical.find(f => f.key === 'eye_color').options),
        face_shape: fk.helpers.arrayElement(this.schema.physical.find(f => f.key === 'face_shape').options),
        distinguishing_marks: fk.helpers.arrayElements(isFa ? ['خال روی گونه چپ', 'جای زخم کوچک روی پیشانی', 'تتو روی مچ دست', 'کک و مک روی بینی', 'چشمانی نافذ'] : ['mole on left cheek', 'small scar on forehead', 'tattoo on wrist', 'freckles across nose', 'piercing eyes'], {min: 1, max: 2})
    };
    
    // === 6. Generate Other Details ===
    this.form.psychology = {
      personality_type: fk.helpers.arrayElement(this.schema.psychology.personality_type.options),
      traits: fk.helpers.arrayElements(this.schema.psychology.traits.options, {min:4, max:7}).map(tr => ({ name: tr, intensity: Math.round(fk.number.int({ min: 20, max: 95 }) / 5) * 5 })),
      values: fk.helpers.arrayElements(isFa ? ['صداقت', 'رشد', 'خانواده', 'آزادی', 'احترام', 'امنیت', 'خلاقیت'] : ['Honesty', 'Growth', 'Family', 'Freedom', 'Respect', 'Security', 'Creativity'], {min:2, max:4}),
      fears: fk.helpers.arrayElements(isFa ? ['عنکبوت', 'ارتفاع', 'سخنرانی عمومی', 'شکست', 'تنهایی', 'فضای بسته'] : ['Spiders', 'Heights', 'Public Speaking', 'Failure', 'Loneliness', 'Claustrophobia'], {min:1, max:3})
    };
    this.form.voice = {
      voice_gender: fk.helpers.arrayElement(this.schema.voice.find(f => f.key === 'voice_gender').options),
      tone: fk.helpers.arrayElement(this.schema.voice.find(f => f.key === 'tone').options),
      pace: fk.helpers.arrayElement(this.schema.voice.find(f => f.key === 'pace').options),
      accent: fk.helpers.arrayElement(isFa ? ['تهرانی', 'اصفهانی', 'شیرازی', 'بدون لهجه', 'شمالی'] : ['Standard American', 'British RP', 'Slight Southern Drawl', 'New York', 'Mid-Atlantic']),
      catchphrases: fk.helpers.arrayElements(isFa ? ['در واقع...', 'می‌دونی چی میگم؟', 'خلاصه که...', 'عملاً', 'به هر حال...'] : ['You know?', 'Actually...', 'Basically...', 'Long story short...', 'At the end of the day...'], {min:1, max:2})
    };
    this.form.movement = {
      posture: fk.helpers.arrayElement(this.schema.movement.find(f => f.key === 'posture').options),
      gait: fk.helpers.arrayElement(this.schema.movement.find(f => f.key === 'gait').options),
      gestures: fk.helpers.arrayElements(isFa ? ['با دست زیاد اشاره می‌کند', 'هنگام فکر کردن سرش را می‌خاراند', 'لبخندهای کوتاه می‌زند', 'قدم‌های محکم برمی‌دارد'] : ['Nods frequently', 'Uses hands when talking', 'Taps fingers when impatient', 'Confident stride'], {min:1, max:2}),
      notes: isFa ? 'معمولاً تماس چشمی طولانی برقرار نمی‌کند و وقتی عصبی است با انگشتانش بازی می‌کند.' : 'Tends to avoid long eye contact and fidgets when nervous.'
    };
    this.form.health = {
      medical_conditions: fk.datatype.boolean(0.5) ? fk.helpers.arrayElements(isFa ? ['آلرژی فصلی', 'کمی نزدیک‌بین', 'میگرن گهگاهی', 'فشار خون بالا'] : ['Pollen allergy', 'Slightly nearsighted', 'Occasional migraines', 'High blood pressure'], {min:1, max:2}) : [],
    };
    
    // === 7. Generate Bio & Finalize ===
    this.form.identity.description = this.generateBio();
    this.form.health.bio = this.generateBio();
    this.buildOutput();
  },
  
  addArrayItem(section,key){ const v=(this.temp.inputs[key]||'').trim(); if(!v) return; this.form[section][key] = this.form[section][key] || []; if (!this.form[section][key].includes(v)) { this.form[section][key].push(v); } this.temp.inputs[key]=''; this.buildOutput(); },
  removeArrayItem(section,key,idx){ this.form[section][key].splice(idx,1); this.buildOutput(); },
  toggleTrait(name){ const i=this.form.psychology.traits.findIndex(x=>x.name===name); if(i>-1){ this.form.psychology.traits.splice(i,1) } else{ this.form.psychology.traits.push({name, intensity:60}) } this.buildOutput(); },
  addCustomTrait(){ const n=this.temp.customTrait.name.trim(); if(!n) return; const i=this.form.psychology.traits.findIndex(x=>x.name===n); if(i>-1){ this.form.psychology.traits[i].intensity=this.temp.customTrait.intensity } else{ this.form.psychology.traits.push({name:n, intensity:this.temp.customTrait.intensity}) } this.temp.customTrait={name:'', intensity:50}; this.buildOutput(); },
  removeTrait(idx){ this.form.psychology.traits.splice(idx,1); this.buildOutput(); },
  buildOutput(){ try { const cleanForm = JSON.parse(JSON.stringify(this.form)); if (cleanForm.identity && cleanForm.identity.is_alive) { cleanForm.identity.dod = null; } this.output=JSON.stringify(cleanForm,null,2); } catch (error) { console.error("Failed to build JSON output:", error); this.output = "Error: Could not generate JSON. Check console for details."; } },
  copyJSON(){ navigator.clipboard.writeText(this.output).then(() => { this.copyStatus = 'copied'; setTimeout(() => { this.copyStatus = 'copy' }, 2000); }); },
  downloadJSON(){ const blob=new Blob([this.output],{type:'application/json'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); const filename = (this.form.identity.name || 'character').replace(/ /g, '_').toLowerCase(); a.href=url; a.download=`${filename}.json`; a.click(); URL.revokeObjectURL(url); }
}));

window.Alpine = Alpine;
Alpine.start();
