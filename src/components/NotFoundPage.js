import React from 'react';
import {Link} from 'react-router-dom';

const NotFoundPage = () => (
    <div>
        <b>Error 404 : <Link to="/">Go Home</Link></b>
    </div>
);

export default NotFoundPage;