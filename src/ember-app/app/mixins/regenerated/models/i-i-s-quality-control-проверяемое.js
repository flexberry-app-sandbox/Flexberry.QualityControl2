import Mixin from '@ember/object/mixin';
import $ from 'jquery';
import DS from 'ember-data';
import { validator } from 'ember-cp-validations';
import { attr, belongsTo, hasMany } from 'ember-flexberry-data/utils/attributes';

export let Model = Mixin.create({
  качество: DS.attr('i-i-s-quality-control-качество'),
  количество: DS.attr('number'),
  продукция: DS.belongsTo('i-i-s-quality-control-продукция', { inverse: null, async: false }),
  отчет: DS.belongsTo('i-i-s-quality-control-отчет', { inverse: 'проверяемое', async: false })
});

export let ValidationRules = {
  качество: {
    descriptionKey: 'models.i-i-s-quality-control-проверяемое.validations.качество.__caption__',
    validators: [
      validator('ds-error'),
    ],
  },
  количество: {
    descriptionKey: 'models.i-i-s-quality-control-проверяемое.validations.количество.__caption__',
    validators: [
      validator('ds-error'),
      validator('number', { allowString: true, allowBlank: true, integer: true }),
    ],
  },
  продукция: {
    descriptionKey: 'models.i-i-s-quality-control-проверяемое.validations.продукция.__caption__',
    validators: [
      validator('ds-error'),
      validator('presence', true),
    ],
  },
  отчет: {
    descriptionKey: 'models.i-i-s-quality-control-проверяемое.validations.отчет.__caption__',
    validators: [
      validator('ds-error'),
      validator('presence', true),
    ],
  },
};

export let defineProjections = function (modelClass) {
  modelClass.defineProjection('ПроверяемоеE', 'i-i-s-quality-control-проверяемое', {
    качество: attr('Качество', { index: 0 }),
    продукция: belongsTo('i-i-s-quality-control-продукция', 'Продукция', {
      название: attr('Название', { index: 2, hidden: true })
    }, { index: 1, displayMemberPath: 'название' })
  });
};
