class SearchController {

    // search
    async search(req, res) {
        return res.status(200).json({ SearchController: 'search'})
    }

}

export default SearchController;