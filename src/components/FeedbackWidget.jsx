import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

function FeedbackWidget({
  onLeaveFeedback,
}) {
  const [reviews, setReviews] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

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
    loadReviews();
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

          <p className="feedback-stars">
            ☆☆☆☆☆
          </p>

          <h3>NFC Review System</h3>

          <p>
            Client feedback will appear here
            after completed deployments.
          </p>

          <button
            className="feedback-leave-button"
            onClick={onLeaveFeedback}
          >
            Leave Feedback
          </button>

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

        <p className="feedback-stars">
          {"★".repeat(review.rating)}
          {"☆".repeat(
            5 - review.rating
          )}
        </p>

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


      <div className="feedback-widget-footer">
        <span>CLIENT FEEDBACK</span>
        <span>VERIFIED</span>
      </div>


      <button
        className="feedback-leave-button"
        onClick={onLeaveFeedback}
      >
        Leave Feedback
      </button>

    </aside>
  );
}

export default FeedbackWidget;