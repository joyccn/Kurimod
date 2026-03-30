---
title: Advanced Examples
sidebar_position: 6
---

## Advanced Examples

This section provides more advanced examples and use cases for Kurimod.

### Multi-Step Form with Validation

Create a multi-step form with input validation:

```python
from Kurimod import Client, Message
from pyrogram import filters
import re

client = Client("my_bot")

@client.on_message(filters.command("register"))
async def register_handler(client: Client, message: Message):
    """Handle user registration with multiple steps"""
    chat = message.chat
    
    # Step 1: Get name
    name = await chat.ask(
        "What's your name?",
        filters=filters.text
    )
    
    # Step 2: Get email with validation
    while True:
        email = await chat.ask(
            "What's your email?",
            filters=filters.text
        )
        
        # Validate email
        if re.match(r"[^@]+@[^@]+\.[^@]+", email.text):
            break
        await chat.ask("Invalid email! Please try again:")
    
    # Step 3: Get age with validation
    while True:
        age = await chat.ask(
            "How old are you?",
            filters=filters.text
        )
        
        # Validate age
        if age.text.isdigit() and 13 <= int(age.text) <= 120:
            break
        await chat.ask("Invalid age! Please enter a number between 13 and 120:")
    
    # Step 4: Get phone number
    phone = await chat.ask(
        "What's your phone number?",
        filters=filters.text
    )
    
    # Confirm registration
    await message.reply(
        f"✅ Registration successful!\n\n"
        f"Name: {name.text}\n"
        f"Email: {email.text}\n"
        f"Age: {age.text}\n"
        f"Phone: {phone.text}"
    )
```

### Interactive Menu with Callback Queries

Create an interactive menu with pagination:

```python
from Kurimod import Client, Message
from Kurimod.helpers import ikb, btn
from Kurimod.nav import Pagination

client = Client("my_bot")

@client.on_message(filters.command("menu"))
async def menu_handler(client: Client, message: Message):
    """Display an interactive menu with pagination"""
    items = [
        {"id": 1, "name": "Item 1", "price": 10},
        {"id": 2, "name": "Item 2", "price": 20},
        {"id": 3, "name": "Item 3", "price": 30},
        {"id": 4, "name": "Item 4", "price": 40},
        {"id": 5, "name": "Item 5", "price": 50},
    ]
    
    # Create pagination
    pagination = Pagination(
        objects=items,
        page_data=lambda x: f"page_{x}",
        item_data=lambda item, page: f"item_{item['id']}",
        item_title=lambda item, page: f"{item['name']} - ${item['price']}"
    )
    
    # Send first page
    keyboard = ikb(pagination.create(page=1))
    sent_message = await message.reply(
        "📦 Choose an item:",
        reply_markup=keyboard
    )
    
    # Wait for callback
    callback = await sent_message.wait_for_click(timeout=60)
    
    if callback.data.startswith("item_"):
        item_id = int(callback.data.split("_")[1])
        item = next((i for i in items if i["id"] == item_id), None)
        
        if item:
            await callback.answer(f"You selected: {item['name']}")
            await callback.message.reply(
                f"🎉 You selected {item['name']} for ${item['price']}"
            )
```

### Conversation with Timeout Handling

Handle timeouts gracefully:

```python
from Kurimod import Client, Message
from Kurimod.exceptions import ListenerTimeout

client = Client("my_bot")

@client.on_message(filters.command("quiz"))
async def quiz_handler(client: Client, message: Message):
    """Run a quiz with timeout handling"""
    chat = message.chat
    
    questions = [
        "What is the capital of France?",
        "What is 2 + 2?",
        "What is the largest planet in our solar system?"
    ]
    
    answers = []
    
    for i, question in enumerate(questions, 1):
        try:
            # Ask question with 30 second timeout
            answer = await chat.ask(
                f"Question {i}/{len(questions)}: {question}",
                timeout=30
            )
            answers.append(answer.text)
            
        except ListenerTimeout:
            await chat.ask(
                f"⏰ Time's up! You didn't answer question {i}."
            )
            await message.reply(
                f"Quiz ended! You answered {len(answers)}/{len(questions)} questions."
            )
            return
    
    # Show results
    await message.reply(
        f"🏆 Quiz complete! You answered all {len(answers)} questions:\n" +
        "\n".join([f"{i+1}. {ans}" for i, ans in enumerate(answers)])
    )
```

### Multi-User Concurrent Conversations

Handle multiple users simultaneously:

```python
from Kurimod import Client, Message
from pyrogram import filters
import asyncio

client = Client("my_bot")

@client.on_message(filters.command("chat"))
async def chat_handler(client: Client, message: Message):
    """Handle concurrent chat with multiple users"""
    chat = message.chat
    
    await message.reply("Let's chat! Send /stop to end the conversation.")
    
    # Listen for messages from this specific user
    while True:
        try:
            # Wait for message with 5 minute timeout
            response = await chat.listen(timeout=300)
            
            # Check if user wants to stop
            if response.text == "/stop":
                await message.reply("👋 Goodbye!")
                break
            
            # Echo back with processing indicator
            processing_msg = await response.reply("⏳ Processing...")
            await asyncio.sleep(1)  # Simulate processing
            
            # Send response
            await processing_msg.edit_text(
                f"You said: {response.text}\n"
                f"Character count: {len(response.text)}"
            )
            
        except ListenerTimeout:
            await message.reply("⏰ Conversation timed out (5 minutes).")
            break
```

### Dynamic Keyboard Based on User Input

Create dynamic keyboards based on previous responses:

```python
from Kurimod import Client, Message
from Kurimod.helpers import ikb, btn

client = Client("my_bot")

@client.on_message(filters.command("order"))
async def order_handler(client: Client, message: Message):
    """Handle food ordering with dynamic keyboard"""
    chat = message.chat
    
    # Step 1: Choose category
    categories = ["Pizza", "Burger", "Drinks", "Dessert"]
    
    keyboard = ikb([
        [btn(cat, f"category_{cat}")]
        for cat in categories
    ])
    
    category_msg = await message.reply(
        "🍽️ Choose a category:",
        reply_markup=keyboard
    )
    
    category_callback = await category_msg.wait_for_click()
    category = category_callback.data.split("_")[1]
    
    # Step 2: Show items for selected category
    items = {
        "Pizza": ["Margherita", "Pepperoni", "Hawaiian"],
        "Burger": ["Cheeseburger", "Bacon Burger", "Veggie Burger"],
        "Drinks": ["Cola", "Orange Juice", "Water"],
        "Dessert": ["Ice Cream", "Cake", "Brownie"]
    }
    
    keyboard = ikb([
        [btn(item, f"item_{item}")]
        for item in items[category]
    ])
    
    await category_callback.answer(f"Selected: {category}")
    item_msg = await category_msg.reply(
        f"📋 Choose a {category}:",
        reply_markup=keyboard
    )
    
    item_callback = await item_msg.wait_for_click()
    item = item_callback.data.split("_")[1]
    
    # Step 3: Confirm order
    keyboard = ikb([
        [btn("✅ Confirm", "confirm"), btn("❌ Cancel", "cancel")]
    ])
    
    await item_callback.answer(f"Selected: {item}")
    confirm_msg = await item_msg.reply(
        f"🛒 Order Summary:\n\n"
        f"Category: {category}\n"
        f"Item: {item}\n\n"
        f"Confirm your order?",
        reply_markup=keyboard
    )
    
    confirm_callback = await confirm_msg.wait_for_click()
    
    if confirm_callback.data == "confirm":
        await confirm_callback.answer("✅ Order confirmed!")
        await confirm_callback.message.reply(
            f"🎉 Thank you for your order!\n\n"
            f"Your {item} will be ready soon."
        )
    else:
        await confirm_callback.answer("❌ Order cancelled")
        await confirm_callback.message.reply("Order cancelled.")
```

### File Upload with Progress

Handle file uploads with progress indication:

```python
from Kurimod import Client, Message
from pyrogram import filters

client = Client("my_bot")

@client.on_message(filters.command("upload"))
async def upload_handler(client: Client, message: Message):
    """Handle file upload with progress"""
    chat = message.chat
    
    await message.reply("📤 Please send a file to upload:")
    
    # Wait for document
    doc = await chat.listen(filters=filters.document)
    
    # Show progress
    progress_msg = await doc.reply(
        f"📥 Received: {doc.document.file_name}\n"
        f"Size: {doc.document.file_size} bytes\n"
        f"⏳ Processing..."
    )
    
    # Simulate processing
    await asyncio.sleep(2)
    
    await progress_msg.edit_text(
        f"✅ File uploaded successfully!\n\n"
        f"Name: {doc.document.file_name}\n"
        f"Size: {doc.document.file_size} bytes\n"
        f"MIME type: {doc.document.mime_type}"
    )
```

### User Profile Management

Create a user profile system:

```python
from Kurimod import Client, Message
from pyrogram import filters
import json

client = Client("my_bot")

# Store user profiles (in production, use a database)
user_profiles = {}

@client.on_message(filters.command("profile"))
async def profile_handler(client: Client, message: Message):
    """Handle user profile management"""
    chat = message.chat
    user_id = message.from_user.id
    
    # Check if profile exists
    if user_id not in user_profiles:
        await message.reply("📝 You don't have a profile yet. Creating one...")
        
        # Create new profile
        name = await chat.ask("What's your name?")
        bio = await chat.ask("Tell me about yourself:")
        
        user_profiles[user_id] = {
            "name": name.text,
            "bio": bio.text,
            "created_at": message.date.isoformat()
        }
        
        await message.reply("✅ Profile created!")
    
    profile = user_profiles[user_id]
    
    # Show profile options
    keyboard = ikb([
        [btn("👤 View Profile", "view")],
        [btn("✏️ Edit Profile", "edit")],
        [btn("🗑️ Delete Profile", "delete")]
    ])
    
    msg = await message.reply(
        f"👤 {profile['name']}'s Profile\n\n"
        f"Bio: {profile['bio']}\n\n"
        f"Choose an action:",
        reply_markup=keyboard
    )
    
    callback = await msg.wait_for_click()
    
    if callback.data == "view":
        await callback.answer("Viewing profile")
        await callback.message.reply(
            f"👤 Profile Details\n\n"
            f"Name: {profile['name']}\n"
            f"Bio: {profile['bio']}\n"
            f"Created: {profile['created_at']}"
        )
    
    elif callback.data == "edit":
        await callback.answer("Editing profile")
        
        new_name = await chat.ask("Enter new name (or send /skip to keep current):")
        if new_name.text != "/skip":
            profile["name"] = new_name.text
        
        new_bio = await chat.ask("Enter new bio (or send /skip to keep current):")
        if new_bio.text != "/skip":
            profile["bio"] = new_bio.text
        
        await message.reply("✅ Profile updated!")
    
    elif callback.data == "delete":
        await callback.answer("Deleting profile")
        del user_profiles[user_id]
        await callback.message.reply("🗑️ Profile deleted!")
```
