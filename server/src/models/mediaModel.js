import Model from '../ubs/db/model';

class UserModel {

    constructor() {
        this.model = new Model({
            table_name: 'ubersite.medias',
            fields: [
                'id',
                'active',

                'user_id',
                'title',
                'slug',
                'uri',
                'path',
                'file',
                'ext',
                
                'created_at',
                'updated_at',
            ]

        });
    }

    async getAll (page, limit, fields) {
        return (await this.model.allPaginated(page, limit, fields)).get();
    }

    async getById (id) {
        return (await this.model.find(id)).get();
    }

    async insert (data) {
        return (await this.model.create(data)).get();
    }

    async update(id, data) {
        var model = await this.model.find(id)
        return (await model.set(data).save()).get();
    }

    async remove(id) {
        return await this.model.remove(id);
    }

    async count ( fields) {
        return await this.model.count(fields);
    }

}

export default new UserModel();