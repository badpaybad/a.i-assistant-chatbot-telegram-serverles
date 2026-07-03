// esp32eventbus.ino - Multithreaded Singleton Event Bus for ESP32

#include <freertos/FreeRTOS.h>
#include <freertos/semphr.h>

#define MAX_SUBSCRIBERS 20
#define MAX_QUEUES 5
#define MAX_QUEUE_SIZE 10
#define MAX_STATE_ITEMS 20
#define MAX_PUBLISH_QUEUE_SIZE 15

// Structs
struct PublishEvent {
  String topic;
  String payload;
};

struct Subscriber {
  String topic;
  String name;
  EventCallback callback;
};

struct MessageQueue {
  String name;
  String items[MAX_QUEUE_SIZE];
  int head = 0;
  int tail = 0;
  int count = 0;
};

struct StateItem {
  String key;
  String value;
};

// Singleton EventBus class definition
class ESP32EventBus {
private:
  ESP32EventBus() {
    ebMutex = xSemaphoreCreateMutex();
    ebSignal = xSemaphoreCreateBinary();
  }
  
  ESP32EventBus(const ESP32EventBus&) = delete;
  ESP32EventBus& operator=(const ESP32EventBus&) = delete;

  SemaphoreHandle_t ebMutex = NULL;
  SemaphoreHandle_t ebSignal = NULL;

  Subscriber ebSubscribers[MAX_SUBSCRIBERS];
  int ebSubscriberCount = 0;

  MessageQueue ebQueues[MAX_QUEUES];
  int ebQueueCount = 0;

  StateItem ebStates[MAX_STATE_ITEMS];
  int ebStateCount = 0;

  PublishEvent ebPubQueue[MAX_PUBLISH_QUEUE_SIZE];
  int ebPubHead = 0;
  int ebPubTail = 0;
  int ebPubCount = 0;

  static void eventBusTask(void *pvParameters);

public:
  static ESP32EventBus& getInstance() {
    static ESP32EventBus instance;
    return instance;
  }

  void start() {
    xTaskCreatePinnedToCore(
      eventBusTask,
      "EventBusTask",
      4096,
      this,
      1,
      NULL,
      0 // Pinned to Core 0 (Arduino runs on Core 1)
    );
  }

  void subscribe(String topic, String subscribeName, EventCallback cb) {
    if (ebMutex == NULL) return;
    if (xSemaphoreTake(ebMutex, portMAX_DELAY) == pdTRUE) {
      topic.trim();
      subscribeName.trim();
      if (topic.length() == 0 || subscribeName.length() == 0 || cb == NULL) {
        Serial.println("[EventBus] Error: Invalid subscription parameters.");
        xSemaphoreGive(ebMutex);
        return;
      }
      
      for (int i = 0; i < ebSubscriberCount; i++) {
        if (ebSubscribers[i].name == subscribeName) {
          Serial.printf("[EventBus] Error: subscribeName '%s' already exists. Registration rejected.\n", subscribeName.c_str());
          xSemaphoreGive(ebMutex);
          return;
        }
      }
      
      if (ebSubscriberCount >= MAX_SUBSCRIBERS) {
        Serial.println("[EventBus] Error: Max subscribers limit reached.");
        xSemaphoreGive(ebMutex);
        return;
      }
      
      ebSubscribers[ebSubscriberCount].topic = topic;
      ebSubscribers[ebSubscriberCount].name = subscribeName;
      ebSubscribers[ebSubscriberCount].callback = cb;
      ebSubscriberCount++;
      
      Serial.printf("[EventBus] Registered subscription '%s' on topic '%s'\n", subscribeName.c_str(), topic.c_str());
      xSemaphoreGive(ebMutex);
    }
  }

  void publish(String topic, String payload) {
    topic.trim();
    if (topic.length() == 0) return;
    if (ebMutex == NULL || ebSignal == NULL) return;

    if (xSemaphoreTake(ebMutex, portMAX_DELAY) == pdTRUE) {
      if (ebPubCount >= MAX_PUBLISH_QUEUE_SIZE) {
        Serial.printf("[EventBus] Error: Publish queue full! Dropping topic '%s'\n", topic.c_str());
        xSemaphoreGive(ebMutex);
        return;
      }
      
      ebPubQueue[ebPubTail].topic = topic;
      ebPubQueue[ebPubTail].payload = payload;
      ebPubTail = (ebPubTail + 1) % MAX_PUBLISH_QUEUE_SIZE;
      ebPubCount++;
      
      xSemaphoreGive(ebMutex);
      xSemaphoreGive(ebSignal); // Wake up the background processing task
    }
  }

  bool enqueue(String queueName, String payload) {
    bool result = false;
    queueName.trim();
    if (queueName.length() == 0) return false;
    if (ebMutex == NULL) return false;

    if (xSemaphoreTake(ebMutex, portMAX_DELAY) == pdTRUE) {
      int qIdx = -1;
      for (int i = 0; i < ebQueueCount; i++) {
        if (ebQueues[i].name == queueName) {
          qIdx = i;
          break;
        }
      }
      
      if (qIdx == -1) {
        if (ebQueueCount >= MAX_QUEUES) {
          Serial.printf("[EventBus] Error: Max queues limit reached. Cannot create queue '%s'.\n", queueName.c_str());
          xSemaphoreGive(ebMutex);
          return false;
        }
        qIdx = ebQueueCount;
        ebQueues[qIdx].name = queueName;
        ebQueues[qIdx].head = 0;
        ebQueues[qIdx].tail = 0;
        ebQueues[qIdx].count = 0;
        ebQueueCount++;
      }
      
      MessageQueue &q = ebQueues[qIdx];
      if (q.count >= MAX_QUEUE_SIZE) {
        Serial.printf("[EventBus] Error: Queue '%s' is full.\n", queueName.c_str());
      } else {
        q.items[q.tail] = payload;
        q.tail = (q.tail + 1) % MAX_QUEUE_SIZE;
        q.count++;
        result = true;
      }
      xSemaphoreGive(ebMutex);
    }
    return result;
  }

  String dequeue(String queueName) {
    String val = "";
    queueName.trim();
    if (queueName.length() == 0) return "";
    if (ebMutex == NULL) return "";

    if (xSemaphoreTake(ebMutex, portMAX_DELAY) == pdTRUE) {
      for (int i = 0; i < ebQueueCount; i++) {
        if (ebQueues[i].name == queueName) {
          MessageQueue &q = ebQueues[i];
          if (q.count > 0) {
            val = q.items[q.head];
            q.items[q.head] = ""; // clear reference
            q.head = (q.head + 1) % MAX_QUEUE_SIZE;
            q.count--;
          }
          break;
        }
      }
      xSemaphoreGive(ebMutex);
    }
    return val;
  }

  void set(String key, String value) {
    key.trim();
    if (key.length() == 0) return;
    if (ebMutex == NULL) return;

    if (xSemaphoreTake(ebMutex, portMAX_DELAY) == pdTRUE) {
      for (int i = 0; i < ebStateCount; i++) {
        if (ebStates[i].key == key) {
          ebStates[i].value = value;
          xSemaphoreGive(ebMutex);
          return;
        }
      }
      
      if (ebStateCount >= MAX_STATE_ITEMS) {
        Serial.printf("[EventBus] Error: Max state items reached. Cannot set '%s'.\n", key.c_str());
      } else {
        ebStates[ebStateCount].key = key;
        ebStates[ebStateCount].value = value;
        ebStateCount++;
      }
      xSemaphoreGive(ebMutex);
    }
  }

  String get(String key) {
    String val = "";
    key.trim();
    if (key.length() == 0) return "";
    if (ebMutex == NULL) return "";

    if (xSemaphoreTake(ebMutex, portMAX_DELAY) == pdTRUE) {
      for (int i = 0; i < ebStateCount; i++) {
        if (ebStates[i].key == key) {
          val = ebStates[i].value;
          break;
        }
      }
      xSemaphoreGive(ebMutex);
    }
    return val;
  }
};

// EventBus background task loops on Core 0
void ESP32EventBus::eventBusTask(void *pvParameters) {
  ESP32EventBus *self = (ESP32EventBus*)pvParameters;
  Serial.printf("[EventBusTask] Background thread started on Core %d\n", xPortGetCoreID());
  
  while (true) {
    // Wait for signal (published message)
    if (xSemaphoreTake(self->ebSignal, portMAX_DELAY) == pdTRUE) {
      // Drain the publish queue
      while (true) {
        PublishEvent ev;
        bool hasEvent = false;
        
        if (xSemaphoreTake(self->ebMutex, portMAX_DELAY) == pdTRUE) {
          if (self->ebPubCount > 0) {
            ev = self->ebPubQueue[self->ebPubHead];
            self->ebPubQueue[self->ebPubHead].topic = "";
            self->ebPubQueue[self->ebPubHead].payload = "";
            self->ebPubHead = (self->ebPubHead + 1) % MAX_PUBLISH_QUEUE_SIZE;
            self->ebPubCount--;
            hasEvent = true;
          }
          xSemaphoreGive(self->ebMutex);
        }
        
        if (!hasEvent) {
          break; // Queue is empty, go back to waiting
        }
        
        // Find subscribers for this topic under mutex
        EventCallback matchedCallbacks[MAX_SUBSCRIBERS];
        int matchedCount = 0;
        
        if (xSemaphoreTake(self->ebMutex, portMAX_DELAY) == pdTRUE) {
          for (int i = 0; i < self->ebSubscriberCount; i++) {
            if (self->ebSubscribers[i].topic == ev.topic) {
              matchedCallbacks[matchedCount++] = self->ebSubscribers[i].callback;
            }
          }
          xSemaphoreGive(self->ebMutex);
        }
        
        // Execute callbacks asynchronously on Core 0 (outside of mutex lock)
        for (int i = 0; i < matchedCount; i++) {
          matchedCallbacks[i](ev.topic, ev.payload);
        }
      }
    }
  }
}

// Global functions exposing the EventBus singleton to other files

void initEventBus() {
  ESP32EventBus::getInstance().start();
}

void subscribe(String topic, String subscribeName, EventCallback cb) {
  ESP32EventBus::getInstance().subscribe(topic, subscribeName, cb);
}

void publish(String topic, String payload) {
  ESP32EventBus::getInstance().publish(topic, payload);
}

bool enqueue(String queueName, String payload) {
  return ESP32EventBus::getInstance().enqueue(queueName, payload);
}

String dequeue(String queueName) {
  return ESP32EventBus::getInstance().dequeue(queueName);
}

void set(String key, String value) {
  ESP32EventBus::getInstance().set(key, value);
}

String get(String key) {
  return ESP32EventBus::getInstance().get(key);
}
