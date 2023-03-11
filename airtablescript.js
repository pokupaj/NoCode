let table = base.getTable("tblysFekEKvshNDsm");
let fields = [];
for (let field of table.fields) {
    fields.push(field.name);
}

let record = await input.recordAsync('Select a record to use', table);
if (record != null) {
    let result = await table.selectRecordAsync(record.id, {
        fields: fields
    });

    let object = {};
    for (let field of fields) {
        let key = field.replace(/\s/g, '_').toLowerCase();
        object[key] = result?.getCellValue(field);
    }

    object.internal_id = record.id;

    console.log(object);

    let response = await remoteFetchAsync('https://hook.eu1.make.com/tfzk4ql6jtnomtd6cig2pmecgi6q32h5', {
        method: 'POST',
        body: JSON.stringify(object),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    console.log(await response.status);
}
