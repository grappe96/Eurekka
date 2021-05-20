package com.ssafy.eurekka.util;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.JsonSerializer;
import java.io.IOException;
import org.bson.types.ObjectId;

public class CustomObjectIdSerializer extends JsonSerializer<ObjectId> {

  @Override
  public void serialize(ObjectId id, JsonGenerator gen, SerializerProvider serializerProvider) throws IOException {
    gen.writeString(id.toString());
  }
}
