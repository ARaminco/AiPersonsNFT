// 1. Import Dependencies
import Alpine from 'alpinejs';
import { Faker, en, fa } from '@faker-js/faker';

// Import CSS files
import 'bootstrap/dist/css/bootstrap.rtl.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './style.css';


// 2. Define the Alpine component
Alpine.data('app', () => ({
  locale:'fa',
  activeTab: 'identity',
  fakers: {},
  copyStatus: 'copy',
  i18n:{
    fa:{
      identity:'هویت و خانواده', physical:'ویژگی‌های فیزیکی', psychology:'روانشناسی', voice:'صدا و گفتار', movement:'حرکات', health:'سلامت و بیوگرافی',
      select_option:'انتخاب کنید', randomize:'ایجاد رندوم', build_json:'ساخت JSON', copy:'کپی', copied: 'کپی شد!', download:'دانلود',
      name:'نام کامل', dob:'تاریخ تولد', is_alive:'در قید حیات', dod:'تاریخ فوت', gender:'جنسیت', nationality:'ملیت', birth_place:'محل تولد',
      marital_status:'وضعیت تاهل', spouse_name:'نام همسر', father_name:"نام پدر", mother_name:"نام مادر", father_status:"وضعیت پدر", mother_status:"وضعیت مادر",
      languages:'زبان‌ها', residence:'محل زندگی', occupation:'شغل', description:'توضیح کوتاه',
      height_cm:'قد (cm)', weight_kg:'وزن (kg)', eye_color:'رنگ چشم', hair_color:'رنگ مو', body_type:'تیپ بدنی',
      face_shape:'شکل صورت', nose_shape:'شکل بینی', mouth_shape:'شکل لب/دهان', jawline:'خط فک', eyebrows:'ابرو‌ها', distinguishing_marks:'علائم خاص',
      personality_type:'تیپ شخصیتی (MBTI)', traits:'صفات شخصیتی', values:'ارزش‌ها', fears:'ترس‌ها', add_custom_trait:'افزودن صفت سفارشی', custom_trait_placeholder: 'نام صفت (انگلیسی)',
      voice_gender:'جنس صدا', tone:'لحن', pace:'سرعت صحبت', accent:'لهجه', catchphrases:'تکه‌کلام‌ها',
      posture:'حالت بدن', gait:'الگوی راه‌رفتن', gestures:'ژست‌ها', notes:'یادداشت‌های حرکتی',
      health_background:'پیشینه سلامت', medical_conditions:'بیماری‌ها/شرایط پزشکی', bio:'بیوگرافی',
      output_json:'خروجی JSON',
      male:'مرد', female:'زن', other:'دیگر', single:'مجرد', married:'متاهل', divorced:'مطلقه', widowed:'بیوه', alive:'زنده', deceased:'فوت شده',
      brown:'قهوه‌ای', black:'مشکی', blue:'آبی', green:'سبز', gray:'خاکستری', hazel:'عسلی', blonde:'بلوند', red:'قرمز', white:'سفید',
      slim:'لاغر', average:'متوسط', athletic:'ورزشکار', heavy:'سنگین‌وزن',
      oval:'بیضی', round:'گرد', square:'مربع', heart:'قلبی', long:'کشیده',
      straight:'صاف', aquiline:'عقابی', snub:'پهن', roman:'رومی',
      full:'پُر', thin:'نازک', wide:'پهن', small:'کوچک',
      strong:'قوی', soft:'نرم', sharp:'تیز', rounded:'گرد',
      thick:'ضخیم', arched:'قوسی',
      kind:'مهربان', curious:'کنجکاو', aggressive:'پرخاشگر', patient:'صبور', brave:'شجاع', anxious:'مضطرب', optimistic:'خوش‌بین', pessimistic:'بدبین',
      perfectionist:'کمال‌گرا', impulsive:'شتاب‌زده', creative:'خلاق', analytical:'تحلیل‌گر', dominant:'سلطه‌گر', submissive:'فرمان‌بردار', humorous:'شوخ‌طبع',
      serious:'جدی', empathetic:'همدل', stoic:'خویشتن‌دار', ambitious:'بلندپرواز', lazy:'تنبل',
      calm:'آرام', energetic:'پرانرژی', formal:'رسمی', casual:'خودمانی', warm:'گرم', cold:'سرد',
      slow:'آهسته', moderate:'متوسط', fast:'سریع',
      straight_posture:'صاف', relaxed:'راحت', slouched:'خمیده',
      medium_gait:'معمولی', confident:'با اعتماد به نفس', limping:'لنگان',
      neutral:'خنثی'
    },
    en:{
      identity:'Identity & Family', physical:'Physical Attributes', psychology:'Psychology', voice:'Voice & Speech', movement:'Movement', health:'Health & Bio',
      select_option:'Select...', randomize:'Randomize', build_json:'Build JSON', copy:'Copy', copied: 'Copied!', download:'Download',
      name:'Full Name', dob:'Date of Birth', is_alive:'Is Alive', dod:'Date of Death', gender:'Gender', nationality:'Nationality', birth_place:'Birth Place',
      marital_status:'Marital Status', spouse_name:'Spouse\'s Name', father_name:"Father's Name", mother_name:"Mother's Name", father_status:"Father's Status", mother_status:"Mother's Status",
      languages:'Languages', residence:'Residence', occupation:'Occupation', description:'Short Description',
      height_cm:'Height (cm)', weight_kg:'Weight (kg)', eye_color:'Eye Color', hair_color:'Hair Color', body_type:'Body Type',
      face_shape:'Face Shape', nose_shape:'Nose Shape', mouth_shape:'Mouth Shape', jawline:'Jawline', eyebrows:'Eyebrows', distinguishing_marks:'Distinguishing Marks',
      personality_type:'Personality Type (MBTI)', traits:'Personality Traits', values:'Values', fears:'Fears', add_custom_trait:'Add Custom Trait', custom_trait_placeholder: 'Trait name (english)',
      voice_gender:'Voice Gender', tone:'Tone', pace:'Speech Pace', accent:'Accent', catchphrases:'Catchphrases',
      posture:'Posture', gait:'Gait', gestures:'Gestures', notes:'Movement Notes',
      medical_conditions:'Medical Conditions', bio:'Biography',
      output_json:'Output JSON',
      male:'Male', female:'Female', other:'Other', single:'Single', married:'Married', divorced:'Divorced', widowed:'Widowed', alive:'Alive', deceased:'Deceased',
      brown:'Brown', black:'Black', blue:'Blue', green:'Green', gray:'Gray', hazel:'Hazel', blonde:'Blonde', red:'Red', white:'White',
      slim:'Slim', average:'Average', athletic:'Athletic', heavy:'Heavy',
      oval:'Oval', round:'Round', square:'Square', heart:'Heart', long:'Long',
      straight:'Straight', aquiline:'Aquiline', snub:'Snub', roman:'Roman',
      full:'Full', thin:'Thin', wide:'Wide', small:'Small',
      strong:'Strong', soft:'Soft', sharp:'Sharp', rounded:'Rounded',
      thick:'Thick', arched:'Arched',
      calm:'Calm', energetic:'Energetic', formal:'Formal', casual:'Casual', warm:'Warm', cold:'Cold',
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
      {key:'gender', type:'enum', label:'gender', options:['male','female','other'], default:''},
      {key:'marital_status', type:'enum', label:'marital_status', options:['single','married','divorced','widowed'], default:''},
      {key:'nationality', type:'string', label:'nationality', default:''},
      {key:'birth_place', type:'string', label:'birth_place', default:''},
      {key:'residence', type:'string', label:'residence', default:''},
      {key:'occupation', type:'string', label:'occupation', default:''},
      {key:'languages', type:'array', label:'languages', default:[]},
      {key:'father_name', type:'string', label:'father_name', default:''},
      {key:'father_status', type:'enum', label:'father_status', options:['alive','deceased'], default:'alive'},
      {key:'mother_name', type:'string', label:'mother_name', default:''},
      {key:'mother_status', type:'enum', label:'mother_status', options:['alive','deceased'], default:'alive'},
      {key:'description', type:'string', label:'description', default:''},
    ],
    physical:[
      {key:'height_cm', type:'number', label:'height_cm', min:50, max:250, default:175, suffix:'cm'},
      {key:'weight_kg', type:'number', label:'weight_kg', min:3, max:300, default:75, suffix:'kg'},
      {key:'body_type', type:'enum', label:'body_type', options:['slim','average','athletic','heavy'], default:'average'},
      {key:'hair_color', type:'enum', label:'hair_color', options:['black','brown','blonde','red','gray','white'], default:'black'},
      {key:'eye_color', type:'enum', label:'eye_color', options:['brown','black','blue','green','gray','hazel'], default:'brown'},
      {key:'face_shape', type:'enum', label:'face_shape', options:['oval','round','square','heart','long'], default:'oval'},
      {key:'nose_shape', type:'enum', label:'nose_shape', options:['straight','aquiline','snub','roman'], default:'straight'},
      {key:'mouth_shape', type:'enum', label:'mouth_shape', options:['full','thin','wide','small'], default:'full'},
      {key:'jawline', type:'enum', label:'jawline', options:['strong','soft','sharp','rounded'], default:'strong'},
      {key:'eyebrows', type:'enum', label:'eyebrows', options:['thick','thin','arched','straight'], default:'thick'},
      {key:'distinguishing_marks', type:'array', label:'distinguishing_marks', default:[]},
    ],
    psychology:{
      personality_type:{type:'enum', options:['INTJ','INTP','INFJ','INFP','ISTJ','ISTP','ISFJ','ISFP','ENTJ','ENTP','ENFJ','ENFP','ESTJ','ESTP','ESFJ','ESFP']},
      traits:{type:'traits', options:['kind','curious','aggressive','patient','brave','anxious','optimistic','pessimistic','perfectionist','impulsive','creative','analytical','dominant','submissive','humorous','serious','empathetic','stoic','ambitious','lazy']},
      values:{type:'array', default:['honesty']},
      fears:{type:'array', default:['failure']}
    },
    voice:[
      {key:'voice_gender', type:'enum', label:'voice_gender', options:['male','female','neutral'], default:'male'},
      {key:'tone', type:'enum', label:'tone', options:['calm','energetic','formal','casual','warm','cold'], default:'calm'},
      {key:'pace', type:'enum', label:'pace', options:['slow','moderate','fast'], default:'moderate'},
      {key:'accent', type:'string', label:'accent', default:''},
      {key:'catchphrases', type:'array', label:'catchphrases', default:[]},
    ],
    movement:[
      {key:'posture', type:'enum', label:'posture', options:['straight_posture','relaxed','slouched'], default:'straight_posture'},
      {key:'gait', type:'enum', label:'gait', options:['slow','medium_gait','fast','confident','limping'], default:'medium_gait'},
      {key:'gestures', type:'array', label:'gestures', default:[]},
      {key:'notes', type:'string', label:'notes', default:''},
    ],
    health:[
      {key:'medical_conditions', type:'array', label:'medical_conditions', default:[]},
      {key:'bio', type:'textarea', label:'bio', default:''},
    ]
  },
  form:{},
  temp:{inputs:{}, customTrait:{name:'', intensity:50}},
  output:'',
  
  init(){
    const deepClone = (obj) => JSON.parse(JSON.stringify(obj));
    Object.keys(this.schema).forEach(sectionKey => {
      const sectionSchema = this.schema[sectionKey];
      this.form[sectionKey] = {};
      if (Array.isArray(sectionSchema)) {
        sectionSchema.forEach(field => {
          this.form[sectionKey][field.key] = deepClone(field.default ?? (field.type === 'array' ? [] : ''));
          if (field.type === 'array') this.temp.inputs[field.key] = '';
        });
      } else {
        Object.keys(sectionSchema).forEach(fieldKey => {
          const field = sectionSchema[fieldKey];
          if(field.type === 'array') {
            this.form[sectionKey][fieldKey] = deepClone(field.default ?? []);
            this.temp.inputs[fieldKey] = '';
          } else if (field.type === 'traits') {
            this.form[sectionKey][fieldKey] = [];
          } else {
            this.form[sectionKey][fieldKey] = '';
          }
        });
      }
    });
    
    this.fakers = {
      en: new Faker({ locale: en }),
      fa: new Faker({ locale: [fa, en] })
    };
    
    this.buildOutput();
  },

  t(k){return (this.i18n[this.locale]&&this.i18n[this.locale][k])||k},

  getAge(dob) {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
  },

  generateBio() {
      const char = { ...this.form.identity, ...this.form.psychology, ...this.form.health };
      const age = this.getAge(char.dob);
      const mainTraits = char.traits.slice(0, 2).map(t => this.t(t.name) || t.name).join(' و ');
      const mainValue = char.values[0] || (this.locale === 'fa' ? 'هیچ ارزش خاصی' : 'no special value');

      if (this.locale === 'fa') {
          return `${char.name}، یک ${char.occupation} ${age} ساله ساکن ${char.residence} است. او که در ${char.birth_place} به دنیا آمده، فردی ${mainTraits} شناخته می‌شود. مهم‌ترین ارزش در زندگی او ${mainValue} است. خانواده‌اش شامل پدرش، ${char.father_name} (${this.t(char.father_status)}) و مادرش، ${char.mother_name} (${this.t(char.mother_status)}) می‌شود.`;
      }
      return `${char.name}, a ${age}-year-old ${char.occupation} residing in ${char.residence}. Born in ${char.birth_place}, they are known for being ${mainTraits}. Their core value is ${mainValue}. Their family includes their father, ${char.father_name} (${this.t(char.father_status)}), and mother, ${char.mother_name} (${this.t(char.mother_status)}).`;
  },
  
  randomize() {
    if (Object.keys(this.fakers).length === 0) return;
    const fk = this.fakers[this.locale];
    const isFa = this.locale === 'fa';

    // --- Age & Date of Birth ---
    const dob = fk.date.past({ years: 80, refDate: new Date(new Date().setFullYear(new Date().getFullYear() - 1)) });
    this.form.identity.dob = dob.toISOString().split('T')[0];
    const age = this.getAge(this.form.identity.dob);

    // --- Logical Death Date ---
    this.form.identity.is_alive = fk.datatype.boolean(0.9); // 90% chance of being alive
    if (!this.form.identity.is_alive) {
      const ageOfDeath = fk.number.int({ min: age, max: Math.min(age + 20, 100) });
      const deathDate = new Date(dob);
      deathDate.setFullYear(deathDate.getFullYear() + ageOfDeath);
      this.form.identity.dod = deathDate > new Date() ? '' : deathDate.toISOString().split('T')[0];
       if (!this.form.identity.dod) this.form.identity.is_alive = true; // Correction if death date is in future
    } else {
      this.form.identity.dod = '';
    }

    // --- Identity ---
    const gender = fk.helpers.arrayElement(this.schema.identity.find(f => f.key === 'gender').options);
    this.form.identity.gender = gender;
    this.form.identity.name = fk.person.fullName({ sex: gender });
    this.form.identity.marital_status = fk.helpers.arrayElement(this.schema.identity.find(f => f.key === 'marital_status').options);
    this.form.identity.nationality = isFa ? 'ایرانی' : fk.location.country();
    this.form.identity.birth_place = fk.location.city();
    this.form.identity.residence = fk.location.city();
    const simpleJobs = isFa ? ['معلم', 'مهندس', 'پزشک', 'هنرمند', 'نویسنده', 'نجار', 'راننده', 'برنامه‌نویس', 'آشپز'] : ['Teacher', 'Engineer', 'Doctor', 'Artist', 'Writer', 'Carpenter', 'Driver', 'Developer', 'Chef'];
    this.form.identity.occupation = fk.helpers.arrayElement(simpleJobs);
    this.form.identity.languages = fk.helpers.arrayElements(isFa ? ['فارسی','انگلیسی','ترکی', 'ارمنی'] : ['English','Spanish','French','German', 'Mandarin'], {min:1, max:3});
    this.form.identity.father_name = fk.person.fullName({ sex: 'male' });
    this.form.identity.father_status = fk.helpers.arrayElement(this.schema.identity.find(f => f.key === 'father_status').options);
    this.form.identity.mother_name = fk.person.fullName({ sex: 'female' });
    this.form.identity.mother_status = fk.helpers.arrayElement(this.schema.identity.find(f => f.key === 'mother_status').options);
    
    // --- Logical Physical Attributes ---
    let height, weight;
    if (age <= 1) {
        height = fk.number.int({ min: 50, max: 75 });
        weight = fk.number.int({ min: 3, max: 10 });
    } else if (age <= 12) {
        height = 75 + (age - 1) * 6;
        weight = 10 + (age - 1) * 2;
    } else if (age <= 20) {
        height = 140 + (age - 12) * (gender === 'male' ? 5 : 3);
        weight = 35 + (age - 12) * 4;
    } else {
        height = gender === 'male' ? fk.number.int({ min: 165, max: 195 }) : fk.number.int({ min: 155, max: 180 });
        const baseWeight = (height - 100) * 0.9;
        weight = Math.round(baseWeight + fk.number.int({min: -10, max: 15}));
    }
    this.form.physical.height_cm = Math.min(height, 250);
    this.form.physical.weight_kg = Math.min(weight, 300);
    this.schema.physical.forEach(f => {
      if (f.type === 'enum') this.form.physical[f.key] = fk.helpers.arrayElement(f.options);
    });
    const marksPool = isFa ? ['خال روی گونه چپ', 'جای زخم کوچک روی پیشانی', 'تتو روی مچ دست'] : ['mole on left cheek', 'small scar on forehead', 'tattoo on wrist', 'freckles across nose'];
    this.form.physical.distinguishing_marks = fk.helpers.arrayElements(marksPool, {min: 1, max: 2});

    // --- Psychology ---
    this.form.psychology.personality_type = fk.helpers.arrayElement(this.schema.psychology.personality_type.options);
    const traitPool = this.schema.psychology.traits.options;
    this.form.psychology.traits = fk.helpers.arrayElements(traitPool, {min:4, max:7})
      .map(tr => ({ name: tr, intensity: Math.round(fk.number.int({ min: 20, max: 95 }) / 5) * 5 }));
    const valuesPool = isFa ? ['صداقت', 'رشد', 'خانواده', 'آزادی', 'احترام'] : ['Honesty', 'Growth', 'Family', 'Freedom', 'Respect'];
    this.form.psychology.values = fk.helpers.arrayElements(valuesPool, {min:2, max:4});
    const fearsPool = isFa ? ['عنکبوت', 'ارتفاع', 'سخنرانی عمومی', 'شکست', 'تنهایی'] : ['Spiders', 'Heights', 'Public Speaking', 'Failure', 'Loneliness'];
    this.form.psychology.fears = fk.helpers.arrayElements(fearsPool, {min:1, max:3});

    // --- Voice ---
    this.schema.voice.forEach(f => {
      if (f.type === 'enum') this.form.voice[f.key] = fk.helpers.arrayElement(f.options);
    });
    const accentPool = isFa ? ['تهرانی', 'اصفهانی', 'شیرازی', 'بدون لهجه'] : ['Standard American', 'British RP', 'Slight Southern Drawl', 'New York'];
    this.form.voice.accent = fk.helpers.arrayElement(accentPool);
    const catchphrasesPool = isFa ? ['در واقع...', 'می‌دونی چی میگم؟', 'خلاصه که...', 'عملاً'] : ['You know?', 'Actually...', 'Basically...', 'Long story short...'];
    this.form.voice.catchphrases = fk.helpers.arrayElements(catchphrasesPool, {min:1, max:2});

    // --- Movement ---
    this.schema.movement.forEach(f => {
      if (f.type === 'enum') this.form.movement[f.key] = fk.helpers.arrayElement(f.options);
    });
    const gesturesPool = isFa ? ['با دست زیاد اشاره می‌کند', 'هنگام فکر کردن سرش را می‌خاراند', 'لبخندهای کوتاه می‌زند'] : ['Nods frequently', 'Uses hands when talking', 'Taps fingers when impatient'];
    this.form.movement.gestures = fk.helpers.arrayElements(gesturesPool, {min:1, max:2});
    this.form.movement.notes = isFa ? 'معمولاً تماس چشمی طولانی برقرار نمی‌کند و وقتی عصبی است با انگشتانش بازی می‌کند.' : 'Tends to avoid long eye contact and fidgets when nervous.';

    // --- Health & Bio (Generated from data) ---
    const conditionsPool = isFa ? ['آلرژی فصلی', 'کمی نزدیک‌بین', 'میگرن گهگاهی'] : ['Pollen allergy', 'Slightly nearsighted', 'Occasional migraines'];
    this.form.health.medical_conditions = fk.datatype.boolean(0.5) ? fk.helpers.arrayElements(conditionsPool, {min:1, max:2}) : [];
    this.form.identity.description = this.generateBio().substring(0, 150) + '...'; // Short description from bio
    this.form.health.bio = this.generateBio();

    this.buildOutput();
  },
  addArrayItem(section,key){
    const v=(this.temp.inputs[key]||'').trim();
    if(!v) return;
    this.form[section][key] = this.form[section][key] || [];
    if (!this.form[section][key].includes(v)) {
      this.form[section][key].push(v);
    }
    this.temp.inputs[key]='';
    this.buildOutput();
  },
  removeArrayItem(section,key,idx){
    this.form[section][key].splice(idx,1);
    this.buildOutput();
  },
  toggleTrait(name){
    const i=this.form.psychology.traits.findIndex(x=>x.name===name);
    if(i>-1){ this.form.psychology.traits.splice(i,1) }
    else{ this.form.psychology.traits.push({name, intensity:60}) }
    this.buildOutput();
  },
  addCustomTrait(){
    const n=this.temp.customTrait.name.trim();
    if(!n) return;
    const i=this.form.psychology.traits.findIndex(x=>x.name===n);
    if(i>-1){ this.form.psychology.traits[i].intensity=this.temp.customTrait.intensity }
    else{ this.form.psychology.traits.push({name:n, intensity:this.temp.customTrait.intensity}) }
    this.temp.customTrait={name:'', intensity:50};
    this.buildOutput();
  },
  removeTrait(idx){
    this.form.psychology.traits.splice(idx,1);
    this.buildOutput();
  },
  buildOutput(){
    const cleanForm = JSON.parse(JSON.stringify(this.form));
    if (cleanForm.identity && cleanForm.identity.is_alive) {
        cleanForm.identity.dod = null;
    }
    this.output=JSON.stringify(cleanForm,null,2);
  },
  copyJSON(){
    navigator.clipboard.writeText(this.output).then(() => {
      this.copyStatus = 'copied';
      setTimeout(() => { this.copyStatus = 'copy' }, 2000);
    });
  },
  downloadJSON(){
    const blob=new Blob([this.output],{type:'application/json'});
    const url=URL.createObjectURL(blob);
    const a=document.createElement('a');
    const filename = (this.form.identity.name || 'character').replace(/ /g, '_').toLowerCase();
    a.href=url; a.download=`${filename}.json`; a.click();
    URL.revokeObjectURL(url);
  }
}));

// 3. Start Alpine
window.Alpine = Alpine;
Alpine.start();