import React, { useState } from 'react';
import { MessageSquare, Star, Send } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const Feedback = () => {
    const { addToast } = useToast();
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [category, setCategory] = useState("Academic");
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (rating === 0) {
            addToast("Please select a rating", "warning");
            return;
        }
        if (!message.trim()) {
            addToast("Please enter your feedback", "warning");
            return;
        }

        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setRating(0);
            setCategory("Academic");
            setMessage("");
            addToast("Feedback submitted successfully. Thank you!", "success");
        }, 800);
    };

    return (
        <main className="px-4 lg:px-8 py-6 w-full max-w-[800px] mx-auto flex-1 flex flex-col">
            <div className="mb-6">
                <h1 className="text-2xl lg:text-3xl font-bold sdp-font-display text-[var(--navy)]">
                    Feedback Portal
                </h1>
                <p className="text-sm font-medium mt-1 text-[var(--slate)]">
                    Your feedback helps us continuously improve the campus experience.
                </p>
            </div>

            <div className="sdp-card p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-[var(--navy)] mb-3">Overall Satisfaction Rating</label>
                        <div className="flex items-center gap-1.5">
                            {[...Array(5)].map((star, index) => {
                                index += 1;
                                return (
                                    <button
                                        type="button"
                                        key={index}
                                        className="focus:outline-none transition-transform hover:scale-110"
                                        onClick={() => setRating(index)}
                                        onMouseEnter={() => setHover(index)}
                                        onMouseLeave={() => setHover(rating)}
                                    >
                                        <Star
                                            size={32}
                                            className={index <= (hover || rating) ? "text-amber-400 fill-amber-400" : "text-gray-300"}
                                        />
                                    </button>
                                );
                            })}
                            <span className="ml-3 text-sm font-bold text-[var(--slate)]">
                                {rating === 5 ? "Excellent" : rating === 4 ? "Good" : rating === 3 ? "Average" : rating === 2 ? "Below Average" : rating === 1 ? "Poor" : "Select Rating"}
                            </span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-[var(--navy)] mb-2">Category</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="sdp-input w-full max-w-sm"
                        >
                            <option value="Academic">Academic Quality</option>
                            <option value="Facilities">Campus Facilities</option>
                            <option value="Hostel">Hostel & Accommodation</option>
                            <option value="Library">Library Services</option>
                            <option value="Extracurricular">Extracurricular Activities</option>
                            <option value="Other">Other Issues</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-[var(--navy)] mb-2">Feedback Details</label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows={5}
                            placeholder="Please describe your experience or suggestions in detail..."
                            className="sdp-input w-full resize-y"
                        />
                        <p className="text-xs text-[var(--slate)] mt-1.5 font-medium">Your identity will be kept confidential upon request to the administration.</p>
                    </div>

                    <div className="pt-4 border-t border-mist flex justify-end">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex items-center gap-2 px-6 py-2.5 bg-[var(--brass)] text-white hover:bg-amber-700 font-bold rounded-lg shadow-sm transition-colors disabled:opacity-70"
                        >
                            {isSubmitting ? 'Submitting...' : <><Send size={16} /> Submit Feedback</>}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default Feedback;
