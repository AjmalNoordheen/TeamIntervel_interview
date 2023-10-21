const express        = require('express')
const router         = express.Router()
const controller     = require('../Controller/taskController')
const multer         = require('../Config/multer')
const upload         = multer.createMulter()

router.post('/addTasks',upload.single('file'),controller.addTasks)
router.get('/listTasks',controller.listTasks)
router.delete('/deleteTask',controller.deleteTask)
router.patch('/editTask',upload.single('file'),controller.editTask)

module.exports = router