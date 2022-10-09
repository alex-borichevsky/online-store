const {Router} = require('express');

const router = Router();

router.use((req, res, next) => {
    if (req.user) next();
    else {
        res.sendStatus(401);
    }
});

const supermarkets = [
    {
        id: 1,
        store: "first"
    },
    {
        id: 2,
        store: "second"
    },
    {
        id: 3,
        store: "third"
    }
];

router.get('', (req, res) => {
    if (req.query.id) {
        const id = req.query.id;
        const market = supermarkets.find(market => id == market.id);
        res.send(market);
    } else {
        res.send(supermarkets);
    }
})

module.exports = router;