class CategoriesController {

    // categories
    async categories(req, res) {
        return res.status(200).json({ CategoriesController: 'categories'})
    }

    // category
    async category(req, res) {
        return res.status(200).json({ CategoriesController: 'category'})
    }

}

export default CategoriesController;