import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib

# ---------------------------------------
# STEP 1: LOAD DATA
# ---------------------------------------
df = pd.read_csv("synthetic_slot_dataset.csv")

# ---------------------------------------
# STEP 2: SELECT FEATURES AND LABEL
# ---------------------------------------
features = [
    "slot_start_hour",
    "day_of_week",
    "is_weekend",
    "recipient_past_success_rate",
    "locality_past_success_rate",
    "agent_available",
    "agent_current_load",
    "package_priority"
]

X = df[features]
y = df["delivery_success"]

# ---------------------------------------
# STEP 3: TRAIN/TEST SPLIT
# ---------------------------------------
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# ---------------------------------------
# STEP 4: TRAIN MODEL
# ---------------------------------------
model = RandomForestClassifier(
    n_estimators=200,
    max_depth=10,
    random_state=42
)

model.fit(X_train, y_train)

# ---------------------------------------
# STEP 5: EVALUATE
# ---------------------------------------
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print("Model Accuracy:", accuracy)

# ---------------------------------------
# STEP 6: SAVE MODEL
# ---------------------------------------
joblib.dump(model, "slot_recommendation_model.pkl")


print("Model saved successfully!") 