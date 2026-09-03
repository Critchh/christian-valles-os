import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

function FeedbackStars({ rating = 0 }) {
  return (
    <p
      className="feedback-stars"
      aria-label={`${rating} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          className={star <= rating ? "is-filled" : ""}
          aria-hidden="true"
          key={star}
        >
          ★
        </span>
      ))}
    </p>
  );
}

function FeedbackWidget({
  onLeaveFeedback,
  showLeaveAction = true,
}) {
  const [reviews, setReviews] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const loadReviews = useCallback(
    async (manualRefresh = false) => {
      if (manualRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const { data, error } = await supabase
        .from("reviews")
        .select(
          "id, author, business, location, rating, quote, created_at"
        )
        .eq("status", "approved")
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        console.error(
          "CVOS review loading error:",
          error
        );

        setLoading(false);
        setRefreshing(false);

        return;
      }

      setReviews(data || []);
      setIndex(0);

      setLoading(false);
      setRefreshing(false);
    },
    []
  );

  useEffect(() => {
    const timer = setTimeout(() => loadReviews(), 0);
    return () => clearTimeout(timer);
  }, [loadReviews]);

  useEffect(() => {
    if (reviews.length <= 1) {
      return;
    }

    const timer = setInterval(() => {
      setIndex((current) =>
        current >= reviews.length - 1
          ? 0
          : current + 1
      );
    }, 8000);

    return () => clearInterval(timer);
  }, [reviews]);

  if (loading) {
    return (
      <aside className="feedback-widget">

        <div className="feedback-widget-top">
          <span>CLIENT FEEDBACK</span>
          <span>SYNCING</span>
        </div>

        <div className="feedback-widget-body">
          <h3>Loading feedback...</h3>
        </div>

      </aside>
    );
  }

  if (reviews.length === 0) {
    return (
      <aside className="feedback-widget">

        <div className="feedback-widget-top">
          <span>CLIENT FEEDBACK</span>
          <span>00 / 00</span>
        </div>

        <div className="feedback-widget-body">

          <FeedbackStars />

          <h3>NFC Review System</h3>

          <p>
            Client feedback will appear here
            after completed deployments.
          </p>

          {showLeaveAction && (
            <button className="feedback-leave-button" onClick={onLeaveFeedback}>
              Leave Feedback
            </button>
          )}

        </div>

      </aside>
    );
  }

  const review = reviews[index];

  return (
    <aside className="feedback-widget">

      <div className="feedback-widget-top">

        <span>
          CLIENT FEEDBACK
        </span>

        <div className="feedback-widget-tools">

          <button
            className="feedback-refresh-button"
            onClick={() =>
              loadReviews(true)
            }
            disabled={refreshing}
            aria-label="Refresh feedback"
          >
            {refreshing ? "..." : "↻"}
          </button>

          <span>
            {String(index + 1).padStart(
              2,
              "0"
            )}
            {" / "}
            {String(reviews.length).padStart(
              2,
              "0"
            )}
          </span>

        </div>

      </div>


      <div className="feedback-widget-body">

        <FeedbackStars rating={review.rating} />

        <blockquote>
          “{review.quote}”
        </blockquote>

        <div className="feedback-author">

          <strong>
            {review.author}
          </strong>

          <span>
            {review.business}

            {review.location
              ? ` • ${review.location}`
              : ""}
          </span>

        </div>

      </div>

      {reviews.length > 1 && (
        <button
          className="feedback-show-all"
          onClick={() => setShowAll((current) => !current)}
        >
          {showAll ? "Show Featured" : `Show All (${reviews.length})`}
        </button>
      )}

      {showAll && (
        <div className="feedback-all-list">
          {reviews.map((item) => (
            <article className="feedback-all-item" key={item.id}>
              <div className="feedback-all-stars">
                {"★".repeat(item.rating)}{"☆".repeat(5 - item.rating)}
              </div>
              <blockquote>“{item.quote}”</blockquote>
              <strong>{item.author}</strong>
              <span>{item.business}{item.location ? ` • ${item.location}` : ""}</span>
            </article>
          ))}
        </div>
      )}


      <div className="feedback-widget-footer">
        <span>CLIENT FEEDBACK</span>
        <span>VERIFIED</span>
      </div>


      {showLeaveAction && (
        <button className="feedback-leave-button" onClick={onLeaveFeedback}>
          Leave Feedback
        </button>
      )}

    </aside>
  );
}

export default FeedbackWidget;
