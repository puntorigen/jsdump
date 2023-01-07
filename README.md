# jsdump
Like JSON stringify but unquoting JS values and objects.
Give it any object and it will create a string representation for it, without quoting the keys and quoting just the string values, resembling the look of that object as used within the source code when writing it to a source file or evaluating it as code.<br/><br/>

Example:<br/>

```js
const test = {
    name: 'Lola',
    age: '23',
    type: 'parrot'
    isAnimal: `()=>{
      if (this.type=='parrot') return true;
      return false;
    }`
}
const jsDump = require('jsdump');
const stringAsJS = jsDump(test);
/*
stringAsJS contents will look like:
{
    name: 'Lola',
    age: 23,
    type: 'parrot'
    isAnimal: ()=>{
      if (this.type=='parrot') return true;
      return false;
    }
}
*/
```