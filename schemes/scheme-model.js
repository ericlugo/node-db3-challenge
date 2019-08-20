const db = require('../data/db-config.js');

const schemeModel = (module.exports = {});

/*
  find():
    Calling find returns a promise that resolves to an array of all schemes in the database.
    No steps are included.
*/
schemeModel.find = function() {
  return db('schemes');
};

/*
  findById(id):
    Expects a scheme id as its only parameter.
    Resolve to a single scheme object.
    On an invalid id, resolves to null.
*/
schemeModel.findById = function(id) {
  return db('schemes')
    .where({ id })
    .first();
};

/*
  findSteps(id):
    Expects a scheme id.
    Resolves to an array of all correctly ordered step for the given scheme: [ { id: 17, scheme_name: 'Find the Holy Grail', step_number: 1, instructions: 'quest'}, { id: 18, scheme_name: 'Find the Holy Grail', step_number: 2, instructions: '...and quest'}, etc. ].
    This array should include the scheme_name not the scheme_id.
*/
schemeModel.findSteps = function(id) {
  return db
    .select('schemes.scheme_name', 'steps.step_number', 'steps.instructions')
    .from('steps')
    .join('schemes', 'schemes.id', 'steps.scheme_id')
    .where({ scheme_id: id })
    .orderBy('steps.step_number');
};

/*
  add(scheme):
    Expects a scheme object.
    Inserts scheme into the database.
    Resolves to the newly inserted scheme, including id.
*/
schemeModel.add = async function(scheme) {
  const [id] = await db('schemes').insert(scheme);
  return schemeModel.findById(id);
};

/*
  update(changes, id):
    Expects a changes object and an id.
    Updates the scheme with the given id.
    Resolves to the newly updated scheme object.
*/
schemeModel.update = async function(changes, id) {
  await db('schemes')
    .where({ id })
    .update(changes);
  return schemeModel.findById(id);
};

/*
  remove(id):
    Removes the scheme object with the provided id.
    Resolves to the removed scheme
    Resolves to null on an invalid id.
    (Hint: Only worry about removing the scheme. The database is configured to automatically remove all associated steps.)
*/
schemeModel.remove = function(id) {
  return db('schemes')
    .where({ id })
    .del();
};

/*
  addStep(step, scheme_id)
    This method expects a step object and a scheme id
    It inserts the new step into the database, correctly linking it to the intended scheme.
    You may use `POST /api/schemes/:id/addStep` to test this method.
*/
schemeModel.addStep = async function(step, scheme_id) {
  if (await schemeModel.findById(scheme_id)) {
    return db('steps').insert({ ...step, scheme_id });
  } else return null;
};
