import db from '../../db';

export default async (req, res) => {
  try {
    let errors = [];
    let resp = await Promise.all(
      req.body.map(async ({ label, value }) => {
        try {
          const response = await db.configuration.updateConfiguration(
            label,
            value,
          );
          if (!response[0]) {
            errors.push(`Could not update '${label}': label does not exist.`);
          }
          return response[0];
        } catch (err) {
          console.error(err);
          throw new Error(`Could not update '${label}' with value '${value}'`);
        }
      }),
    );

    if (errors.length === 0) {
      res.send(resp);
    } else {
      res.status(404).send(errors);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};
