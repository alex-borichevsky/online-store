const {Router} = require('express');
const router = Router();

router.use((req, res, next) => {
    if (req.user) next();
    else {
        res.sendStatus(401);
    }
});

const itemsList =
    [
        {
            id: 1,
            item: "hui"
        },
        {
            id: 2,
            item: "chlen"
        },
        {
            id: 3,
            item:  "cock"
        }
    ];


router.get("", (req, res) => {

    res.cookie('visited', true, {
        maxAge: 60000,
    });
    res.send(itemsList);
})

router.post("", (req, res) => {
    const item = req.body;
    itemsList.push(item);
    res.sendStatus(201);
})

router.get("/:id", (req, res) => {
   console.log(req.cookies);
    const id = req.params.id;
    const item = itemsList.find( item => item.id == id);
    res.send(item);
})

router.get('/shopping/cart', (req, res) => {
    const {cart} = req.session;
    if (!cart) {
        res.send("You don't have cart in your session");
    } else {
        res.send(cart);
    }
})
router.post('/shopping/cart/item', (req, res) => {
    const {id, item} = req.body;
    const cartItem = {id, item};
    const {cart} = req.session;
    if (cart) {
        req.session.cart.items.push(cartItem);
    } else {
        req.session.cart = {
            items: [cartItem],
        }
    }
    res.sendStatus(201);
})

module.exports = router;