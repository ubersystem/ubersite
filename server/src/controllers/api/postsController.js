import model from '../../models/postModel';

const getAll = async function (req, res) {

    let pageIndex = parseInt(req.query.page || 1);
    let pageSize = parseInt(req.query.pageSize || 250);

    try {

        const rs = await model.getAll(pageIndex, pageSize);
        const totalSize = parseInt(await model.count());
        const totalPages = parseInt( totalSize / pageSize) + 1;
        const hasPreviousPage = (pageIndex > 1 );
        const hasNextPage = ( pageIndex < totalPages);

        res.status(200).json({ 
            success: true, 
            data: rs, 
            pagination:{
                pageIndex,
                pageSize,
                totalPages,
                totalSize,
                hasPreviousPage,
                hasNextPage,
            }

        });

    } catch (error) {
        res.status(200).json({ success: false, message: `${error}` });
    }

}

const getById = async function (req, res) {

    var id = req.params.id;
    try {
        const rs = await model.getById(id);
        res.status(200).json({ success: true, data: rs});
    } catch (error) {
        res.status(200).json({ success: false, message: `${error}` });
    }

}

const insert = async function (req, res) {

    var data = req.body.data;
    try {
        const rs = await model.insert(data);
        res.status(200).json({ success: true, data: rs});
    } catch (error) {
        res.status(200).json({ success: false, message: `${error}` });
    }

}

const update = async function (req, res) {

    var id = req.params.id;
    var data = req.body.data;

    console.log(data)

    try {
        const rs = await model.update(id, data);
        res.status(200).json({ success: true, data: rs});
    } catch (error) {
        res.status(200).json({ success: false, message: `${error}` });
    }

}

const remove = async function (req, res) {

    var id = req.params.id;
    try {
        const rs = await model.remove(id);
        res.status(200).json({ success: true, data: rs});
    } catch (error) {
        res.status(200).json({ success: false, message: `${error}` });
    }

}

export default {
    getAll,
    getById,
    insert,
    update,
    remove
}