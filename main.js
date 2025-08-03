import Alpine from 'alpinejs';
import { Faker, en, fa } from '@faker-js/faker';
import * as bootstrap from 'bootstrap';
import { i18n } from './js/i18n.js';

import 'bootstrap/dist/css/bootstrap.rtl.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './style.css';

Alpine.data('app', () => ({
  locale:'fa',
  activeTab: 'identity',
  fakers: {},
  copyStatus: 'copy',
  spouseModal: null,
  childModal: null,
  i18n: i18n,
  schema:{
    identity:[
      {key:'name', type:'string', label:'name', default:''}, {key:'dob', type:'date', label:'dob', default:''},
      {key:'is_alive', type:'boolean', label:'is_alive', default: true}, {key:'dod', type:'date', label:'dod', default:''},
      {key:'gender', type:'enum', label:'gender', options:['male','female'], default:''},
      {key:'marital_status', type:'enum', label:'marital_status', options:['single','married','divorced','widowed'], default:''},
      {key:'nationality', type:'string', label:'nationality', default:''}, {key:'birth_place', type:'string', label:'birth_place', default:''},
      {key:'residence', type:'string', label:'residence', default:''}, {key:'occupation', type:'string', label:'occupation', default:''},
      {key:'languages', type:'array', label:'languages', default:[]}, {key:'description', type:'textarea', label:'description', default:''},
    ],
    family: [
        { key: 'father_name', type: 'string', label: 'father_name', group: 'parents' }, { key: 'father_status', type: 'enum', label: 'father_status', group: 'parents', options:['alive','deceased'] },
        { key: 'mother_name', type: 'string', label: 'mother_name', group: 'parents' }, { key: 'mother_status', type: 'enum', label: 'mother_status', group: 'parents', options:['alive','deceased'] },
    ],
    physical:[
      {key:'height_cm', type:'number', label:'height_cm', min:50, max:250, default:175, suffix:'cm'}, {key:'weight_kg', type:'number', label:'weight_kg', min:3, max:300, default:75, suffix:'kg'},
      {key:'skin_tone', type:'enum', label:'skin_tone', options:['fair', 'light', 'olive', 'brown', 'dark']}, {key:'build', type:'enum', label:'build', options:['slim', 'athletic', 'average', 'stout', 'muscular', 'heavy']},
      {key:'clothing_style', type:'enum', label:'clothing_style', options:['casual', 'formal', 'vintage', 'modern', 'sporty']},
      {key:'hair_color', type:'enum', label:'hair_color', options:['black_hair','brown_hair','blonde','red','gray_hair','white']},
      {key:'eye_color', type:'enum', label:'eye_color', options:['brown_eye','black_eye','blue','green','gray','hazel']},
      {key:'face_shape', type:'enum', label:'face_shape', options:['oval','round','square','heart','long']},
      {key:'distinguishing_marks', type:'array', label:'distinguishing_marks', default:[]},
    ],
    psychology:{
      personality_type:{type:'enum', options:['INTJ','INTP','INFJ','INFP','ISTJ','ISTP','ISFJ','ISFP','ENTJ','ENTP','ENFJ','ENFP','ESTJ','ESTP','ESFJ','ESFP']},
      traits:{type:'traits', options:['kind','curious','aggressive','patient','brave','anxious','optimistic','pessimistic','perfectionist','impulsive','creative','analytical','dominant','submissive','humorous','serious','empathetic','stoic','ambitious','lazy']},
      values:{type:'array', default:[]}, fears:{type:'array', default:[]}
    },
    voice:[
      {key:'voice_gender', type:'enum', label:'voice_gender', options:['male','female','neutral']}, {key:'tone', type:'enum', label:'tone', options:['calm','energetic','formal','casual','warm','cold']},
      {key:'pace', type:'enum', label:'pace', options:['slow','moderate','fast']}, {key:'accent', type:'string', label:'accent'}, {key:'catchphrases', type:'array', label:'catchphrases'},
    ],
    movement:[
      {key:'posture', type:'enum', label:'posture', options:['straight_posture','relaxed','slouched']}, {key:'gait', type:'enum', label:'gait', options:['slow','medium_gait','fast','confident','limping']},
      {key:'gestures', type:'array', label:'gestures'}, {key:'notes', type:'string', label:'notes'},
    ],
    health:[ {key:'medical_conditions', type:'array', label:'medical_conditions'}, {key:'bio', type:'textarea', label:'bio'}, ]
  },
  form:{ identity:{}, family:{ spouse: null, children: [] }, physical:{}, psychology:{}, voice:{}, movement:{}, health:{} },
  temp:{inputs:{}, customTrait:{name:'', intensity:50}, editingSpouse: null, editingChild: null, editingChildIndex: null},
  output:'',
  
  init(){
    this.fakers = { en: new Faker({ locale: en }), fa: new Faker({ locale: [fa, en] }) };
    this.spouseModal = new bootstrap.Modal(document.getElementById('spouseModal'));
    this.childModal = new bootstrap.Modal(document.getElementById('childModal'));
    this.resetForm();
    this.buildOutput();
    this.$watch('locale', (newLocale) => {
        document.title = this.i18n[newLocale].page_title;
    });
    document.title = this.i18n[this.locale].page_title;
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
    if (!age) return '';
    const mainTraits = psychology.traits.slice(0, 2).map(t => this.t(t.name) || t.name).join(' و ');
    const mainValue = psychology.values[0] || '';
    const t = (k) => this.t(k);

    if (this.locale === 'fa') {
      let bio = `${identity.name}، یک ${identity.occupation} ${age} ساله ساکن ${identity.residence} است. او که در ${identity.birth_place} به دنیا آمده، فردی ${mainTraits} شناخته می‌شود. مهم‌ترین ارزش در زندگی او ${mainValue} است.`;
      if (family.spouse) { bio += ` او با ${family.spouse.name} (${t('spouse')}, ${t(family.spouse.status)}) در ارتباط است.`}
      if (family.children.length > 0) { bio += ` آنها ${family.children.length} فرزند دارند.`}
      return bio;
    }
    
    let bio = `${identity.name}, a ${age}-year-old ${identity.occupation} residing in ${identity.residence}. Born in ${identity.birth_place}, they are known for being ${mainTraits}. Their core value is ${mainValue}.`;
    if (family.spouse) { bio += ` They are in a relationship with ${family.spouse.name} (Spouse, ${t(family.spouse.status)}).`}
    if (family.children.length > 0) { bio += ` They have ${family.children.length} children.`}
    return bio;
  },
  
  randomize() {
    this.resetForm();
    const fk = this.fakers[this.locale];
    const isFa = this.locale === 'fa';

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

    const characterGender = fk.helpers.arrayElement(this.schema.identity.find(f => f.key === 'gender').options);
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
    
    this.form.family.father_name = fk.person.firstName('male') + ' ' + fatherLastName;
    this.form.family.father_status = fk.helpers.arrayElement(this.schema.family.find(f => f.key === 'father_status').options);
    this.form.family.mother_name = fk.person.firstName('female') + ' ' + (isFa ? fk.person.lastName() : fk.person.lastName('female'));
    this.form.family.mother_status = fk.helpers.arrayElement(this.schema.family.find(f => f.key === 'mother_status').options);

    const dob = fk.date.birthdate({ min: 18, max: 80, mode: 'age' });
    const age = this.getAge(dob);
    
    this.form.identity = {
        name: fk.person.firstName(characterGender) + ' ' + characterLastName,
        dob: dob.toISOString().split('T')[0],
        is_alive: fk.helpers.weightedArrayElement([{weight: 9, value: true}, {weight: 1, value: false}]),
        gender: characterGender,
        marital_status: fk.helpers.arrayElement(this.schema.identity.find(f => f.key === 'marital_status').options),
        nationality, birth_place, residence, languages,
        occupation: fk.helpers.arrayElement(isFa ? ['معلم', 'مهندس نرم‌افزار', 'پزشک عمومی', 'جراح مغز و اعصاب', 'هنرمند تجسمی', 'نویسنده', 'نجار', 'راننده تاکسی', 'برنامه‌نویس وب', 'آشپز', 'مغازه‌دار', 'وکیل', 'استاد دانشگاه', 'دانشمند داده', 'معمار', 'گرافیست', 'خلبان', 'روزنامه‌نگار', 'عکاس'] : ['Teacher', 'Software Engineer', 'General Practitioner', 'Neurosurgeon', 'Visual Artist', 'Writer', 'Carpenter', 'Taxi Driver', 'Web Developer', 'Chef', 'Shopkeeper', 'Lawyer', 'Professor', 'Data Scientist', 'Architect', 'Graphic Designer', 'Pilot', 'Journalist', 'Photographer']),
    };
    this.form.identity.dod = this.form.identity.is_alive ? '' : fk.date.past({years: Math.min(age, 15), refDate: new Date()}).toISOString().split('T')[0];
    
    if (this.form.identity.marital_status !== 'single' && age > 20) {
        const spouseGender = characterGender === 'male' ? 'female' : 'male';
        const spouseDob = fk.date.birthdate({min: Math.max(18, age - 5), max: age + 5, mode: 'age'});
        this.form.family.spouse = {
            name: fk.person.firstName(spouseGender) + ' ' + spouseLastName,
            dob: spouseDob.toISOString().split('T')[0],
            status: fk.helpers.weightedArrayElement([{weight: 9, value: 'alive'}, {weight: 1, value: 'deceased'}])
        };

        const canHaveChildren = this.form.identity.marital_status === 'married' || this.form.identity.marital_status === 'widowed';
        if (canHaveChildren && age > 22) {
            const numChildren = fk.number.int({min: 0, max: 4});
            const motherDob = (characterGender === 'female' ? new Date(dob) : new Date(spouseDob));
            for (let i = 0; i < numChildren; i++) {
                const earliestBirthYear = motherDob.getFullYear() + 18;
                const latestBirthYear = motherDob.getFullYear() + 45;
                if (latestBirthYear <= earliestBirthYear || new Date().getFullYear() < earliestBirthYear) continue;
                const validStartYear = earliestBirthYear;
                const validEndYear = Math.min(latestBirthYear, new Date().getFullYear());
                if(validStartYear > validEndYear) continue;
                const childBirthYear = fk.number.int({min: validStartYear, max: validEndYear});
                const childDob = fk.date.between({ from: new Date(childBirthYear, 0, 1), to: new Date(childBirthYear, 11, 31) });
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
    
    let height, weight;
    if (age <= 1) { height = fk.number.int({ min: 50, max: 75 }); weight = fk.number.int({ min: 3, max: 10 }); } 
    else if (age <= 12) { height = 75 + (age - 1) * 6; weight = 10 + (age - 1) * 2.5; } 
    else if (age <= 20) { height = 140 + (age - 12) * (characterGender === 'male' ? 4 : 3); weight = 35 + (age - 12) * 4; } 
    else { height = characterGender === 'male' ? fk.number.int({ min: 165, max: 195 }) : fk.number.int({ min: 155, max: 180 }); const baseWeight = (height - 100) * 0.9; weight = Math.round(baseWeight + fk.number.int({min: -10, max: 15})); }
    this.form.physical = {
        height_cm: Math.min(Math.round(height), 250), weight_kg: Math.min(Math.round(weight), 300),
        skin_tone: fk.helpers.arrayElement(this.schema.physical.find(f => f.key === 'skin_tone').options),
        build: fk.helpers.arrayElement(this.schema.physical.find(f => f.key === 'build').options),
        clothing_style: fk.helpers.arrayElement(this.schema.physical.find(f => f.key === 'clothing_style').options),
        hair_color: fk.helpers.arrayElement(this.schema.physical.find(f => f.key === 'hair_color').options),
        eye_color: fk.helpers.arrayElement(this.schema.physical.find(f => f.key === 'eye_color').options),
        face_shape: fk.helpers.arrayElement(this.schema.physical.find(f => f.key === 'face_shape').options),
        distinguishing_marks: fk.helpers.arrayElements(isFa ? ['خال روی گونه چپ', 'جای زخم کوچک روی پیشانی', 'تتو روی مچ دست', 'کک و مک روی بینی', 'چشمانی نافذ', 'ابروهای پرپشت'] : ['mole on left cheek', 'small scar on forehead', 'tattoo on wrist', 'freckles across nose', 'piercing eyes', 'thick eyebrows'], {min: 1, max: 2})
    };
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
      accent: accent,
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
    this.form.identity.description = this.generateBio();
    this.form.health.bio = this.generateBio();
    this.buildOutput();
  },

  openSpouseModal() { this.temp.editingSpouse = JSON.parse(JSON.stringify(this.form.family.spouse || { name: '', dob: '', status: 'alive' })); this.spouseModal.show(); },
  saveSpouse() { this.form.family.spouse = JSON.parse(JSON.stringify(this.temp.editingSpouse)); this.spouseModal.hide(); this.buildOutput(); },
  removeSpouse() { this.form.family.spouse = null; this.spouseModal.hide(); this.buildOutput(); },
  openChildModal(child = null, index = null) { this.temp.editingChildIndex = index; this.temp.editingChild = JSON.parse(JSON.stringify(child || { name: '', gender: 'male', dob: '', status: 'alive' })); this.childModal.show(); },
  saveChild() { if (this.temp.editingChildIndex !== null) { this.form.family.children[this.temp.editingChildIndex] = JSON.parse(JSON.stringify(this.temp.editingChild)); } else { this.form.family.children.push(JSON.parse(JSON.stringify(this.temp.editingChild))); } this.childModal.hide(); this.buildOutput(); },
  removeChild(index) { this.form.family.children.splice(index, 1); this.buildOutput(); },
  
  addArrayItem(section,key){ const v=(this.temp.inputs[key]||'').trim(); if(!v) return; this.form[section][key] = this.form[section][key] || []; if (!this.form[section][key].includes(v)) { this.form[section][key].push(v); } this.temp.inputs[key]=''; this.buildOutput(); },
  removeArrayItem(section,key,idx){ this.form[section][key].splice(idx,1); this.buildOutput(); },
  toggleTrait(name){ const i=this.form.psychology.traits.findIndex(x=>x.name===name); if(i>-1){ this.form.psychology.traits.splice(i,1) } else{ this.form.psychology.traits.push({name, intensity:60}) } this.buildOutput(); },
  addCustomTrait(){ const n=this.temp.customTrait.name.trim(); if(!n) return; const i=this.form.psychology.traits.findIndex(x=>x.name===n); if(i>-1){ this.form.psychology.traits[i].intensity=this.temp.customTrait.intensity } else{ this.form.psychology.traits.push({name:n, intensity:this.temp.customTrait.intensity}) } this.temp.customTrait={name:'', intensity:50}; this.buildOutput(); },
  removeTrait(idx){ this.form.psychology.traits.splice(idx,1); this.buildOutput(); },
  buildOutput(){ try { const cleanForm = JSON.parse(JSON.stringify(this.form)); if (cleanForm.identity && cleanForm.identity.is_alive) { cleanForm.identity.dod = null; } this.output=JSON.stringify(cleanForm,null,2); } catch (error) { console.error("Failed to build JSON output:", error, this.form); this.output = "Error: Could not generate JSON. Check console for details."; } },
  copyJSON(){ navigator.clipboard.writeText(this.output).then(() => { this.copyStatus = 'copied'; setTimeout(() => { this.copyStatus = 'copy' }, 2000); }); },
  downloadJSON(){ const blob=new Blob([this.output],{type:'application/json'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); const filename = (this.form.identity.name || 'character').replace(/ /g, '_').toLowerCase(); a.href=url; a.download=`${filename}.json`; a.click(); URL.revokeObjectURL(url); }
}));

window.Alpine = Alpine;
Alpine.start();
