/**
 * Created by xulingming on 2017/4/11.
 */
'use strict';

import {Router} from 'express';
import * as controller from './album.controller';
import * as auth from '../../../auth/auth.service';

var router = new Router();

router.get('/', controller.index);
router.post('/', auth.isAuthenticated(), controller.createAlbumDir);

module.exports = router;