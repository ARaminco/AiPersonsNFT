import Alpine from 'alpinejs';
import { Faker, en, fa } from '@faker-js/faker';
import * as bootstrap from 'bootstrap';

import { i18n } from '../modules/i18n.js';
import { schema } from '../modules/schema.js';
import { randomizeCharacter } from '../modules/characterLogic.js';
import { generateImage } from '../modules/aiService.js';

export const app = () => ({
  locale: 'fa',
  activeTab: 'identity',
  fakers: {},
  copyStatus: 'copy',
  spouseModal: null,
  childModal: null,
  i18n: i18n,
  schema: schema,
  ai: {
    enabled: false,
    provider: 'openai',
    key: null,
    generating: false,
    imageUrl: '',
    error: null,
  },
  form: {},
  temp: { inputs: {}, customTrait: { name: '', intensity: 50 }, editingSpouse: null, editingChild: null, editingChildIndex: null },
  output: '',

  init() {
    this.fakers = { en: new Faker({ locale: en }), fa: new Faker({ locale: [fa, en] }) };
    this.spouseModal = new bootstrap.Modal(document.getElementById('spouseModal'));
    this.childModal = new bootstrap.Modal(document.getElementById('childModal'));

    this.ai.key = localStorage.getItem('ai_api_key');
    this.ai.provider = localStorage.getItem('ai_provider') || 'openai';
    this.ai.enabled = !!this.ai.key;

    this.resetForm();
    this.buildOutput();

    this.$watch('locale', (newLocale) => {
        document.title = this.i18n[newLocale].page_title;
        this.buildOutput();
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
          if(field.type === 'array') {
            this.form[sectionKey][fieldKey] = deepClone(field.default ?? []);
            if (this.temp.inputs) this.temp.inputs[fieldKey] = '';
          }
          else if (field.type === 'traits') {
            this.form[sectionKey][fieldKey] = [];
          }
          else {
            this.form[sectionKey][fieldKey] = '';
          }
        });
      }
    });
    this.form.family.spouse = null;
    this.form.family.children = [];
  },

  t(k) { return (this.i18n[this.locale] && this.i18n[this.locale][k]) || k.replace(/_hair|_eye/g, '') },

  getAge(dob) {
    if (!dob) return 0;
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
  },
  
  async generateNewCharacter() {
    if (this.ai.generating) return;

    if (this.ai.enabled && !this.ai.key) {
        this.openAiModal();
        return;
    }
    
    this.ai.generating = true;
    this.ai.imageUrl = '';
    this.ai.error = null;

    this.form = randomizeCharacter(this.fakers, this.schema, this.locale, (k) => this.t(k));
    this.buildOutput();

    if (this.ai.enabled) {
        try {
            const imageUrl = await generateImage(this.ai.key, this.ai.provider, this.form, this.locale, (key) => this.t(key));
            this.ai.imageUrl = imageUrl;
        } catch (error) {
            console.error(error);
            this.ai.error = error.message;
        }
    }
    
    this.ai.generating = false;
  },
  
  toggleAi() {
    if (this.ai.enabled && !this.ai.key) {
      this.openAiModal();
    }
    if (!this.ai.enabled) {
        this.ai.imageUrl = '';
        this.ai.error = null;
    }
  },

  openAiModal() { this.aiApiModal.show(); },
  
  saveApiKey() {
    if (this.ai.key) {
      localStorage.setItem('ai_api_key', this.ai.key);
      localStorage.setItem('ai_provider', this.ai.provider);
      this.ai.enabled = true;
      this.aiApiModal.hide();
      this.ai.error = null;
    }
  },

  removeApiKey() {
    localStorage.removeItem('ai_api_key');
    localStorage.removeItem('ai_provider');
    this.ai.key = null;
    this.ai.enabled = false;
    this.aiApiModal.hide();
  },

  buildOutput() {
    try {
        const cleanForm = JSON.parse(JSON.stringify(this.form));
        if (cleanForm.identity && cleanForm.identity.is_alive) {
            cleanForm.identity.dod = null;
        }
        this.output = JSON.stringify(cleanForm, null, 2);
    } catch (error) {
        console.error("Failed to build JSON output:", error, this.form);
        this.output = "Error: Could not generate JSON.";
    }
  },
  
  copyJSON() { navigator.clipboard.writeText(this.output).then(() => { this.copyStatus = 'copied'; setTimeout(() => { this.copyStatus = 'copy' }, 2000); }); },
  
  downloadJSON() { const blob=new Blob([this.output],{type:'application/json'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); const filename = (this.form.identity.name || 'character').replace(/ /g, '_').toLowerCase(); a.href=url; a.download=`${filename}.json`; a.click(); URL.revokeObjectURL(url); },

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
});