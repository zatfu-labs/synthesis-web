module.exports = {
    checkRole: function (role) {
         return (req, res, next) => {
						if (req.user.role === role) {
							next();
						} else {
							res.status(403).json({ message: 'Access denied' });
						}
					};
    }
}