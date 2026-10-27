export const uploadResume = async (
  req,
  res
) => {

  try {

    if (!req.file) {

      return res.status(400).json({

        message:
          "Please upload a PDF resume"

      });

    }

    res.status(200).json({

      message:
        "Resume uploaded successfully",

      file: req.file.filename

    });

  } catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

};