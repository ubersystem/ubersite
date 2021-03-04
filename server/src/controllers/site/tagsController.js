class TagsController {

    // tags
    async tags(req, res) {
        return res.status(200).json({ TagsController: 'tags'})
    }

    // tag
    async tag(req, res) {
        return res.status(200).json({ TagsController: 'tag'})
    }



}

export default TagsController;