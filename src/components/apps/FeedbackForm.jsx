import { useState } from "react";
import { supabase } from "../../lib/supabase";

function FeedbackForm() {
  const initialForm = {
    author: "",
    business: "",
    location: "",
    rating: 5,
    quote: "",
  };

  const [formData, setFormData] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submittedReview, setSubmittedReview] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]:
        name === "rating"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setErrorMessage("");

    const cleanedReview = {
      author: formData.author.trim(),
      business: formData.business.trim(),
      location: formData.location.trim(),
      rating: formData.rating,
      quote: formData.quote.trim(),
    };

    if (
      !cleanedReview.author ||
      !cleanedReview.business ||
      !cleanedReview.quote
    ) {
      setErrorMessage(
        "Please complete all required fields."
      );

      return;
    }

    if (
      cleanedReview.rating < 1 ||
      cleanedReview.rating > 5
    ) {
      setErrorMessage(
        "Please select a rating between 1 and 5."
      );

      return;
    }

    setSubmitting(true);

    try {
      const { error } = await supabase
        .from("reviews")
        .insert([
          {
            ...cleanedReview,

            location:
              cleanedReview.location || null,

            status: "pending",
          },
        ]);

      if (error) {
        throw error;
      }

      setSubmittedReview(cleanedReview);
      setFormData(initialForm);
    } catch (error) {
      console.error(
        "CVOS feedback submission error:",
        error
      );

      setErrorMessage(
        "Your feedback could not be submitted. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmittedReview(null);
    setErrorMessage("");
    setFormData(initialForm);
  };

  if (submittedReview) {
    return (
      <div className="feedback-form-success">

        <div className="feedback-success-mark">
          ✓
        </div>

        <p className="app-eyebrow">
          SUBMISSION RECEIVED
        </p>

        <h1>Thank you.</h1>

        <p className="feedback-success-copy">
          Your feedback has been submitted successfully
          and is currently awaiting review.
        </p>

        <div className="feedback-success-preview">

          <div className="feedback-success-rating">
            {"★".repeat(submittedReview.rating)}
            {"☆".repeat(
              5 - submittedReview.rating
            )}
          </div>

          <blockquote>
            “{submittedReview.quote}”
          </blockquote>

          <div>
            <strong>
              {submittedReview.author}
            </strong>

            <span>
              {submittedReview.business}

              {submittedReview.location
                ? ` • ${submittedReview.location}`
                : ""}
            </span>
          </div>

        </div>

        <div className="feedback-success-status">
          <span className="feedback-status-dot"></span>

          Pending approval
        </div>

        <button
          type="button"
          onClick={resetForm}
        >
          Leave Another Response
        </button>

      </div>
    );
  }

  return (
    <div className="feedback-form-app">

      <div className="feedback-form-header">
        <p className="app-eyebrow">
          CLIENT FEEDBACK
        </p>

        <h1>Leave Feedback</h1>

        <p>
          Share your experience working with
          Christian or using one of his business
          solutions.
        </p>
      </div>


      <form
        className="feedback-form"
        onSubmit={handleSubmit}
      >

        <div className="feedback-form-grid">

          <label>
            <span>Your Name *</span>

            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Name"
              maxLength={80}
              required
            />
          </label>


          <label>
            <span>Business *</span>

            <input
              type="text"
              name="business"
              value={formData.business}
              onChange={handleChange}
              placeholder="Business name"
              maxLength={120}
              required
            />
          </label>

        </div>


        <label>
          <span>Location</span>

          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="McAllen, TX"
            maxLength={120}
          />
        </label>


        <label>
          <span>Rating *</span>

          <select
            name="rating"
            value={formData.rating}
            onChange={handleChange}
          >
            <option value={5}>
              ★★★★★ — Excellent
            </option>

            <option value={4}>
              ★★★★☆ — Very Good
            </option>

            <option value={3}>
              ★★★☆☆ — Good
            </option>

            <option value={2}>
              ★★☆☆☆ — Fair
            </option>

            <option value={1}>
              ★☆☆☆☆ — Poor
            </option>
          </select>
        </label>


        <label>
          <span>Feedback *</span>

          <textarea
            name="quote"
            value={formData.quote}
            onChange={handleChange}
            placeholder="Tell me about your experience..."
            rows={6}
            maxLength={1000}
            required
          />
        </label>


        {errorMessage && (
          <p className="feedback-form-error">
            {errorMessage}
          </p>
        )}


        <div className="feedback-form-actions">

          <span>
            Submissions are reviewed before
            appearing publicly.
          </span>

          <button
            type="submit"
            disabled={submitting}
          >
            {submitting
              ? "Submitting..."
              : "Submit Feedback"}
          </button>

        </div>

      </form>
    </div>
  );
}

export default FeedbackForm;