# Minimum Data Model
users: id, email, name, role, created_at, last_seen, consent_status
events: id, user_id, anonymous_session_id, event_type, page, metadata, created_at
leads: id, type, institution_name, contact_name, email, phone, city, requirements, status, created_at
programmes: id, name, description, audience, status, price, metadata
merchandise: id, name, description, image, price, status, metadata
orders: id, user_id, item_type, item_id, amount, currency, status, created_at
payments: id, order_id, provider, provider_reference, amount, currency, status, created_at
