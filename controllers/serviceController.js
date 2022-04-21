const Service = require('../models/service');

const submit_service = (req, res, next) => {
    let service = new Service(req.body);
    service.timestamp = new Date();
    let saveService = () => {
        service.save((err) => {
            if (err) return next(err);
            res.send({
                status: 'success',
                service
            })
        })
    }
    saveService();
}

const get_services = (req, res, next) => {
    Service.find({ "account.id": req.params.id }, function (err, data) {
        if (err) return next(err);
        res.send(data)
    });
}

const get_agent_services = (req, res, next) => {
    Service.find({ "createdBy.id": req.params.id }, function (err, data) {
        if (err) return next(err);
        res.send(data)
    });
}

module.exports = {
    submit_service,
    get_services,
    get_agent_services,
}