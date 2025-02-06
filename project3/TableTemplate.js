'use script';

class TableTemplate{
    static fillIn(id,dict,column){

        let table = document.getElementById(id);
        table.style = 'visibility:visible';

        if(column === undefined){
            let template = new Cs142TemplateProcessor(table.tBodies[0].innerHTML);
            table.tBodies[0].innerHTML = template.fillIn(dict);
            return ;
        }

        let tablehead = table.tBodies[0].rows[0];
        let template = new Cs142TemplateProcessor(tablehead.innerHTML);
        tablehead.innerHTML = template.fillIn(dict);
        let columnid;
        for(let i = 0;i<tablehead.cells.length;i++){
            if(tablehead.cells[i].innerHTML === column){
                columnid = i;
            }
        }
        for(let i = 1;i<table.rows.length;i++){
            let template = new Cs142TemplateProcessor(table.tBodies[0].rows[i].cells[columnid].innerHTML);
            table.tBodies[0].rows[i].cells[columnid].innerHTML = template.fillIn(dict);
        }
    }
}