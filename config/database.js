module.exports = 
  { "development":
    { "driver":   "mongodb",
      "url": "mongodb://localhost/test"
    }
  , "test":
    { "driver":   "memory"
    }
  , "production":
    { "driver":   "memory"
    }
  };
