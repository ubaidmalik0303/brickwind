const Website = require("../models/websiteModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const keygen = require("keygenerator");
const { storage } = require("../utils/firebase");
const {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} = require("firebase/storage");

exports.updateWebsiteDetails = catchAsyncError(async (req, res, next) => {
  let website = await Website.findOne();
  if (website) {
    if (req.files?.logo) {
      //Delete Old Image
      const deleteRef = await ref(storage, `website/${website.logo.public_id}`);
      await deleteObject(deleteRef);

      //Upload New Image
      const imageKey = keygen._();
      const imageName = imageKey + "." + req.files.logo.mimetype.split("/")[1];

      const imageRef = await ref(storage, `website/${imageName}`);
      await uploadBytes(imageRef, req.files.logo.data, {
        contentType: req.files.logo.mimetype,
      });
      await getDownloadURL(imageRef).then((url) => {
        req.body.logo = {
          public_id: imageName,
          url,
        };
      });
    }

    if (req.files?.banner) {
      //Delete Old Image
      const deleteRef = await ref(
        storage,
        `website/${website.banner.public_id}`
      );
      await deleteObject(deleteRef);

      //Upload New Image
      const imageKey = keygen._();
      const imageName =
        imageKey + "." + req.files.banner.mimetype.split("/")[1];

      const imageRef = await ref(storage, `website/${imageName}`);
      await uploadBytes(imageRef, req.files.banner.data, {
        contentType: req.files.banner.mimetype,
      });
      await getDownloadURL(imageRef).then((url) => {
        req.body.banner = {
          public_id: imageName,
          url,
        };
      });
    }

    await Website.findOneAndUpdate({}, req.body);

    res.status(200).json({
      success: true,
      website: website,
    });
  } else {
    //First Time Details Submit
    const createWebsite = await Website.create(req.body);

    if (req.files?.logo) {
      //Upload New Image
      const imageKey = keygen._();
      const imageName = imageKey + "." + req.files.logo.mimetype.split("/")[1];

      const imageRef = await ref(storage, `website/${imageName}`);
      await uploadBytes(imageRef, req.files.logo.data, {
        contentType: req.files.logo.mimetype,
      });
      await getDownloadURL(imageRef).then((url) => {
        createWebsite.logo = {
          public_id: imageName,
          url,
        };
      });
    }

    if (req.files?.banner) {
      //Upload New Image
      const imageKey = keygen._();
      const imageName =
        imageKey + "." + req.files.banner.mimetype.split("/")[1];

      const imageRef = await ref(storage, `website/${imageName}`);
      await uploadBytes(imageRef, req.files.banner.data, {
        contentType: req.files.banner.mimetype,
      });
      await getDownloadURL(imageRef).then((url) => {
        createWebsite.banner = {
          public_id: imageName,
          url,
        };
      });
    }

    await createWebsite.save();

    res.status(200).json({
      success: true,
      website: createWebsite,
    });
  }
});

exports.websiteDetails = catchAsyncError(async (req, res, next) => {
  const website = await Website.findOne();

  res.status(201).json({
    success: true,
    website: website,
  });
});
