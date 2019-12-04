import { parse } from 'url';

// mock tableListDataSource
let map = null;


function fetchMapDetail(req, res, u) {
  const result = map;
  return res.json({
    result
  })
}

function saveMapDetail(req, res, u) {
  map = req.body.detail;
  return res.json({})
}


export default {
  'POST /api/map/detail': fetchMapDetail,
  'POST /api/map/save': saveMapDetail,
};
