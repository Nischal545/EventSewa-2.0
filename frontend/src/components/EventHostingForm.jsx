import { useEffect, useState } from "react";
// import TimeSetter from "./TimeSetter";
import Buttons from "../components/Button";

export default function EventHostingForm({ uploadUrl, onSubmit }) {
  const [note, setNote] = useState(null);
  const [images, setImages] = useState([]);
  const [imageError, setImageError] = useState("");
  const [artistLinks, setArtistLinks] = useState([""]);

  const pricingNote = () => {
    const message = "10% commission will be the part of EventSewa";
    setNote(message);
  };

  useEffect(() => {
    return () => {
      images.forEach((image) => URL.revokeObjectURL(image.previewUrl));
    };
  }, [images]);

  const handleImagesChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const supportedTypes = ["image/jpeg", "image/png", "image/webp"];
    const invalidFile = selectedFiles.find(
      (file) =>
        !supportedTypes.includes(file.type) || file.size > 5 * 1024 * 1024,
    );

    if (invalidFile) {
      setImageError(
        invalidFile.type && !supportedTypes.includes(invalidFile.type)
          ? "Please select JPG, PNG, or WebP images."
          : "Each image must be smaller than 5 MB.",
      );
      event.target.value = "";
      return;
    }

    if (selectedFiles.length > 5) {
      setImageError("You can upload up to 5 images.");
      event.target.value = "";
      return;
    }

    setImageError("");
    setImages(
      selectedFiles.map((file) => ({
        file,
        previewUrl: URL.createObjectURL(file),
      })),
    );
  };

  const removeImage = (index) => {
    setImages((currentImages) => {
      URL.revokeObjectURL(currentImages[index].previewUrl);
      return currentImages.filter((_, imageIndex) => imageIndex !== index);
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (images.length === 0) {
      setImageError("Please upload at least one event image.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    formData.delete("images");
    images.forEach((image) => formData.append("images", image.file));
    formData.delete("artistLinks");
    artistLinks
      .map((link) => link.trim())
      .filter(Boolean)
      .forEach((link) => formData.append("artistLinks", link));

    if (onSubmit) {
      await onSubmit(formData);
    } else if (uploadUrl) {
      const response = await fetch(uploadUrl, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Image upload failed (${response.status})`);
      }
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:py-16">
      <form
        className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60"
        onSubmit={handleSubmit}
      >
        <header className="border-b border-slate-200 bg-gradient-to-r from-indigo-50 to-white px-6 py-8 sm:px-10">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-indigo-600">
            EventSewa · Organizer
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            Create an event
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">
            Add the details below to help guests discover and plan for your
            event.
          </p>
        </header>

        <div className="space-y-9 px-6 py-8 sm:px-10">
          <section aria-labelledby="event-details-heading">
            <div className="mb-5">
              <h2
                id="event-details-heading"
                className="text-lg font-semibold text-slate-900"
              >
                Event details
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Start with the name and location.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label
                  htmlFor="eventName"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  Event name
                </label>
                <input
                  id="eventName"
                  name="eventName"
                  placeholder="e.g. Summer Sound Festival"
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="eventAddress"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  Event address
                </label>
                <input
                  id="eventAddress"
                  name="eventAddress"
                  placeholder="Venue, street, city"
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                />
              </div>
            </div>
          </section>

          <section aria-labelledby="schedule-heading">
            <div className="mb-5">
              <h2
                id="schedule-heading"
                className="text-lg font-semibold text-slate-900"
              >
                Event schedule
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Set the start and end times.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {["Start time", "End time"].map((label) => (
                <fieldset
                  key={label}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                >
                  <legend className="px-1 text-sm font-medium text-slate-700">
                    {label}
                  </legend>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      max="12"
                      placeholder="HH"
                      aria-label={`${label} hour`}
                      className="w-16 rounded-lg border border-slate-300 bg-white px-2 py-2 text-center text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                    />
                    <span className="text-slate-400">:</span>
                    <input
                      type="number"
                      min="0"
                      max="59"
                      placeholder="MM"
                      aria-label={`${label} minute`}
                      className="w-16 rounded-lg border border-slate-300 bg-white px-2 py-2 text-center text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                    />
                    <select
                      aria-label={`${label} AM or PM`}
                      className="rounded-lg border border-slate-300 bg-white px-2 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                    >
                      <option>AM</option>
                      <option>PM</option>
                    </select>
                  </div>
                </fieldset>
              ))}
            </div>
          </section>

          <section aria-labelledby="lineup-heading">
            <div className="mb-5">
              <h2
                id="lineup-heading"
                className="text-lg font-semibold text-slate-900"
              >
                Lineup &amp; tickets
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Share who is performing and how many guests you expect.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="performers"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  Performers
                </label>
                <input
                  id="performers"
                  placeholder="Artist or performer names"
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                />
              </div>
              <div>
                <label
                  htmlFor="attendeeCount"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  Expected attendees
                </label>
                <input
                  id="attendeeCount"
                  type="number"
                  min="1"
                  placeholder="e.g. 250"
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                />
              </div>
              <div>
                <label
                  htmlFor="ticketPrice"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  Ticket price
                </label>
                <div className="flex overflow-hidden rounded-lg border border-slate-300 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/10">
                  <span className="flex items-center border-r border-slate-200 bg-slate-50 px-3 text-sm text-slate-500">
                    NPR
                  </span>
                  <input
                    id="ticketPrice"
                    name="ticketPrice"
                    type="number"
                    min="0"
                    placeholder="Amount"
                    onChange={pricingNote}
                    className="min-w-0 flex-1 px-3.5 py-2.5 text-sm outline-none placeholder:text-slate-400"
                  />
                </div>
                {note && (
                  <p className="mt-2 text-xs text-slate-500">{note}</p>
                )}
              </div>
            </div>
          </section>

          <section aria-labelledby="media-heading">
            <div className="mb-5">
              <h2
                id="media-heading"
                className="text-lg font-semibold text-slate-900"
              >
                Event image
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Choose up to 5 JPG, PNG, or WebP images. Maximum 5 MB each.
              </p>
            </div>
            <label
              htmlFor="eventImages"
              className="flex cursor-pointer flex-col items-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-5 py-7 text-center transition hover:border-indigo-400 hover:bg-indigo-50/50"
            >
              <span className="mb-2 flex h-11 w-11 items-center justify-center rounded-full bg-indigo-100 text-xl text-indigo-600">
                ↑
              </span>
              <span className="text-sm font-semibold text-slate-800">
                Click to upload event images
              </span>
              <span className="mt-1 text-xs text-slate-500">
                JPG, PNG, or WebP
              </span>
              <input
                id="eventImages"
                name="images"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                onChange={handleImagesChange}
                className="sr-only"
              />
            </label>
            {imageError && (
              <p role="alert" className="mt-2 text-sm text-red-600">
                {imageError}
              </p>
            )}
            {images.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {images.map((image, index) => (
                  <div
                    key={image.previewUrl}
                    className="group relative overflow-hidden rounded-xl border border-slate-200"
                  >
                    <img
                      src={image.previewUrl}
                      alt={`Event preview ${index + 1}`}
                      className="h-32 w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute right-2 top-2 rounded-lg bg-slate-900/75 px-2.5 py-1 text-xs font-medium text-white opacity-100 transition hover:bg-red-600 sm:opacity-0 sm:group-hover:opacity-100"
                      aria-label={`Remove ${image.file.name}`}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section aria-labelledby="artist-links-heading">
            <div className="mb-5">
              <h2
                id="artist-links-heading"
                className="text-lg font-semibold text-slate-900"
              >
                Artist links
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Add profile or video links so guests can discover your artists.
                Links appear in the order listed.
              </p>
            </div>
            <div className="space-y-3">
              {artistLinks.map((link, index) => (
                <div
                  key={index}
                  className="flex flex-wrap items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3 sm:flex-nowrap"
                >
                  <span className="w-6 shrink-0 text-center text-xs font-semibold text-slate-400">
                    {index + 1}
                  </span>
                  <input
                    type="url"
                    name="artistLinks"
                    value={link}
                    onChange={(event) =>
                      setArtistLinks((currentLinks) =>
                        currentLinks.map((currentLink, linkIndex) =>
                          linkIndex === index
                            ? event.target.value
                            : currentLink,
                        ),
                      )
                    }
                    placeholder="https://artist-profile-or-video-link"
                    aria-label={`Artist link ${index + 1}`}
                    className="min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                  />
                  <div className="ml-auto flex gap-1">
                    <button
                      type="button"
                      onClick={() =>
                        setArtistLinks((currentLinks) =>
                          currentLinks.filter(
                            (_, linkIndex) => linkIndex !== index,
                          ),
                        )
                      }
                      aria-label={`Remove artist link ${index + 1}`}
                      className="rounded-lg px-2.5 py-2 text-xs font-medium text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                    >
                      Remove
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setArtistLinks((currentLinks) => {
                          if (index === 0) return currentLinks;
                          const reorderedLinks = [...currentLinks];
                          [reorderedLinks[index - 1], reorderedLinks[index]] = [
                            reorderedLinks[index],
                            reorderedLinks[index - 1],
                          ];
                          return reorderedLinks;
                        })
                      }
                      disabled={index === 0}
                      aria-label={`Move artist link ${index + 1} up`}
                      className="rounded-lg px-2.5 py-2 text-xs font-medium text-slate-500 transition hover:bg-white hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      Up
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setArtistLinks((currentLinks) => {
                          if (index === currentLinks.length - 1)
                            return currentLinks;
                          const reorderedLinks = [...currentLinks];
                          [reorderedLinks[index], reorderedLinks[index + 1]] = [
                            reorderedLinks[index + 1],
                            reorderedLinks[index],
                          ];
                          return reorderedLinks;
                        })
                      }
                      disabled={index === artistLinks.length - 1}
                      aria-label={`Move artist link ${index + 1} down`}
                      className="rounded-lg px-2.5 py-2 text-xs font-medium text-slate-500 transition hover:bg-white hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      Down
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  setArtistLinks((currentLinks) => [...currentLinks, ""])
                }
                className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50"
              >
                <span aria-hidden="true" className="text-lg leading-none">
                  +
                </span>
                Add artist link
              </button>
            </div>
          </section>
        </div>

        <footer className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <p className="text-xs text-slate-500">
            Review your event details before submitting.
          </p>
          <Buttons
            index={1}
            type="submit"
            className="rounded-lg px-6 py-2.5 text-sm"
          >
            Create event
          </Buttons>
        </footer>
      </form>
    </main>
  );
}
