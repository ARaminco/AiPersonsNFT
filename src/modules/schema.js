export const schema = {
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
};