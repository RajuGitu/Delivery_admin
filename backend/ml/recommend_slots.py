import joblib
import numpy as np

import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "slot_recommendation_model.pkl")

model = joblib.load(MODEL_PATH)
# ----------------------------
# LOAD TRAINED MODEL
# ----------------------------
#model = joblib.load("slot_recommendation_model.pkl")

# Define available slots
slots = [
    {"slot": "9 am - 11 am", "slot_start_hour": 9},
    {"slot": "11 am - 1 pm", "slot_start_hour": 11},
    {"slot": "1 pm - 3 pm", "slot_start_hour": 13},
    {"slot": "3 pm - 5 pm", "slot_start_hour": 15},
    {"slot": "5 pm - 7 pm", "slot_start_hour": 17},
    {"slot": "7 pm - 9 pm", "slot_start_hour": 19},
    {"slot": "9 pm - 11 pm", "slot_start_hour": 21},
]

# Simulated input data for one user (you can replace with your real data)
day_of_week = 2
is_weekend = 0
recipient_past_success_rate = 0.80
locality_past_success_rate = 0.75
agent_available = 1
agent_current_load = 2
package_priority = 0

slot_results = []

# ----------------------------
# GET PROBABILITY FOR EACH SLOT
# ----------------------------
for s in slots:
    feature_row = [
        s["slot_start_hour"],
        day_of_week,
        is_weekend,
        recipient_past_success_rate,
        locality_past_success_rate,
        agent_available,
        agent_current_load,
        package_priority
    ]

    # Predict probability (success = class 1)
    probability = model.predict_proba([feature_row])[0][1]

    slot_results.append({
        "slot": s["slot"],
        "probability": probability
    })

# ----------------------------
# SORT AND PICK TOP 3
# ----------------------------
top_3 = sorted(slot_results, key=lambda x: x["probability"], reverse=True)[:3]

# ----------------------------
# PRINT RESULT
# ----------------------------
'''
print("\nTop 3 Recommended Slots:")
for item in top_3:
    print(f"{item['slot']}  →  Probability: {item['probability']:.2f}")
'''

import json
print(json.dumps(top_3))