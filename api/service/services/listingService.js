import Listing from "./../models/listingModel.js";

export const saveListing = async (newListing) => {
    const listing = new Listing(newListing);
    return listing.save();
  };  

export const getListings = async () => {
    return Listing.find(); // Fetch all job listings
};

export const removeListing = async (listingID) => {
    const result = await Listing.deleteOne({ listingID });
    if (result.deletedCount === 0) {
        throw new Error("Listing not found");
    }
};
