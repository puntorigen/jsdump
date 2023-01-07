const jsDump = (obj) => {
    let resp='';
    let isNumeric = function(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    };
    let escape = function(obi) {
        let nuevo = '', ob = obi;
        //special escapes first
        if (typeof ob === 'string' && ob=='{null}') ob = null;
        if (typeof ob === 'string') ob = ob.replaceAll('{now}','new Date()');
        //
        if (typeof ob === 'number') {
            nuevo += ob;
        } else if (ob == null) {
            nuevo = null;
        } else if (typeof ob === 'boolean') {
            nuevo += ob;
        } else if (typeof ob === 'string' &&
            ob.substr(0,2)=='**' && ob.substr(ob.length-2)=='**') {
            nuevo += ob.replaceAll('**',''); //escape single ** vars 21-abr-21
        } else if ((typeof ob === 'string') && (
            ob.charAt(0)=='!' || 
            ob.indexOf('this.')!=-1 || 
            ob.indexOf('new ')!=-1 || 
            ob.indexOf('require(')!=-1 || 
            ob.indexOf(`'`)!=-1 || 
            ob.indexOf('`')!=-1 ||
            (ob.charAt(0)!='0' && isNumeric(ob)) ||
            ob=='0' || 
            ob=='true' || ob=='false')
            ) {
            nuevo += ob;
        } else if (!isNaN(ob) && ob.toString().indexOf('.') != -1) {
            nuevo += ob;
        } else if (typeof ob === 'string') {
            nuevo += `'${ob}'`;
        } else {
            nuevo += ob;
        }
        return nuevo;
    };
    if (Array.isArray(obj)) {
        let tmp = [];
        let resx = '[';
        for (let item in obj) {
            tmp.push(jsDump(obj[item]));
            if (resx=='[') {
                resx += tmp[item];
            } else {
                resx += ','+tmp[item];
            }
        }
        resp = resx+']';
        //resp = `[${tmp.join(',')}]`;
    } else if (typeof obj === 'object' && obj!=null) {
        let tmp=[];
        //23feb22 test if object if regEx type
        if (obj.toString()[0]=='/' && obj.toString()[obj.toString().length-1]=='/') {
            //regEx type
            resp = obj.toString();
        } else {            
            //
            for (let llave in obj) {
                let llavet = llave;
                if (llavet.includes('-') && llavet.includes(`'`)==false) llavet = `'${llave}'`;
                let nuevo = `${llavet}: `;
                let valor = obj[llave];
                if (typeof valor === 'object' || Array.isArray(valor)) {
                    nuevo += jsDump(valor);
                } else {
                    nuevo += escape(valor);
                }
                tmp.push(nuevo);
            }
            resp = `{\n${tmp.join(',')}\n}`;
        }
    } else if (typeof(obj) === 'string') {
        resp = escape(obj);
    } else {
        resp = obj;
    }
    return resp;
}

module.exports = jsDump;