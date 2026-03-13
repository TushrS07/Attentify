# ─────────────────────────────
# Stage 1: Builder
# ─────────────────────────────
FROM python:3.10-slim AS builder

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    cmake \
    gcc \
    g++ \
    python3-dev \
    libglib2.0-0 \
    libgl1 \
    && rm -rf /var/lib/apt/lists/*

RUN pip install --upgrade pip

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt


# ─────────────────────────────
# Stage 2: Runtime
# ─────────────────────────────
FROM python:3.10-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    libglib2.0-0 \
    libgl1 \
    libgomp1 \
    libsm6 \
    libxext6 \
    libxrender1 \
    && rm -rf /var/lib/apt/lists/*

# 👇 THIS is the correct way
COPY --from=builder /usr/local /usr/local

COPY . .

RUN useradd -m appuser && chown -R appuser /app
USER appuser

EXPOSE 5006

CMD ["python", "python.py"]
